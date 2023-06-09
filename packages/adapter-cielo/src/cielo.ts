import { defineGateway } from 'goyim'

type CieloConfig = {
  merchantKey: string
  merchantId: string
}

type CieloTransactionRequest = {
  body: {
    teste: 1
  }
}

const cielo = defineGateway<CieloConfig, CieloTransactionRequest>()((config) => {
  return {
    alias: 'cielo',
    acceptedMethods: [
      'creditcard',
      'pix'
    ],
    cardTransactionRequest: {
      url: 'http://teste.com/',
      body: {
        teste: 1
      }
    }
  }
})

cielo({
  gateways: {
    cielo: {
      merchantKey: 'oi',
      merchantId: 'oi',
    }
  }
})
