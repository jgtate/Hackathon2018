import { neo4jgraphql, augmentSchema } from 'neo4j-graphql-js';

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { v1 as neo4j } from 'neo4j-driver';

let driver;

function context(headers, secrets) {
  if (!driver) {
    driver = neo4j.driver(
      'bolt://35.237.20.38:7687/'
      // neo4j.auth.basic('neo4j', 'letmein')
    );
  }
  return { driver };
}

// The GraphQL schema in string form
const typeDefs = `
  type Drug {
    chembl_id: String
    molecule_type: String
    chembl_ids: [String]
    molecule_types: [String]
    related_genes: Int @cypher(
      statement: "WITH {this} AS this RETURN SIZE((this)--())"
    )
    pagerank: Float
    betweenness: Float
    relation: [Gene] @relation(name: "TARGETS", direction: "OUT")
  }
  type Disease {
    disease_id: String
    disease_label: String
    disease_ids: [String]
    disease_labels: [String]
    is_unmet: Boolean
    interesting: [Drug] @cypher (
      statement: "MATCH q=(disease1:Disease {disease_id: (this.disease_id) })-[a]-(t1:Gene)--(u1:Uniprot)-[uui:INTERACTION]-(u2:Uniprot)-[ugi]-(t2:Gene)--(d1:Drug) RETURN d1 ORDER BY uui.intact_score, a.overall_score LIMIT 10"
    )
  }
  type Gene {
    ensembl_gene_id: String
    pfam_id: String
  }
  type Query {
    DiseasesBySubstring(substring: String, first: Int): [Disease] @cypher(statement: "MATCH (d:Disease) WHERE toLower(d.disease_label) CONTAINS toLower($substring) RETURN d")
    Disease(disease_id: String, disease_label: String, first: Int): [Disease]
    Drug(chembl_id: String, first: Int): [Drug]
    DrugBySubstring(substring: String, first: Int): [Drug] @cypher(statement: "MATCH (d:Drug) WHERE toLower(d.chembl_id) CONTAINS toLower($substring) RETURN d")
    Gene(ensembl_gene_id: String, first: Int): [Gene]
    Genes(first: Int): [Gene]
  }
`

// The resolvers
const resolvers = {
  Query: {
    Drug(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    Disease(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    Gene(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    Genes(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    DiseasesBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    DrugBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})

// Initialize the app
const app = express()

app.use(cors())

app.use(function (req, res, next) {
  console.log(req.ip + ' ' + req.url)
  next()
})

const augmentedSchema = augmentSchema(schema);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(request => ({
    schema: augmentedSchema,
    // rootValue,
    context: context(request.headers, process.env)
  }))
);

// GraphiQL, a visual editor for queries
app.use('/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

app.use('/graphiql2',
  graphiqlExpress({
    endpointURL: 'http://35.237.20.38:7474/graphql/'
  })
)

app.use('/', (req, res, next) => {
  res.send(schema)
})

// Start the server
app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphiql to run queries!')
})
