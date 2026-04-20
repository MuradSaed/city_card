import JSEncrypt from 'jsencrypt/bin/jsencrypt.js'

let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3g9GTaW894SvandRSmHeo8S467ydnPbLDYyDiaWQhpgMjsph57ioSrBk6GUFcNAlqoA5fLZKEG/6ESxMDoXGcauLnAfCgZdQcs4XAjXO+6MYFhXvJuhJdmgiRwDf2IETiQS9h0FjGEkf0xYrC3UPunsoI+QcWvMV4c6h8v21CdwIDAQAB'
let privateKey = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKrGhmkxSfuu4x0AjtJoTy1EWoPq6/etAuIcrC4afqiMtQNW+UKyVzeOyNuUF4xwJseSQDJugfR/CQwZY88PpS8on1OZk3udNqM03WYLKswmi4MoHFAAE5xwtIDkVxiZ9XKQSOuIUlkr4QtCAmIGTVUnk3UG0ak+RdgSJrkJrYSjAgMBAAECgYEAhnNobTc2BSXqfvHqf/NJqtzu2n9BKi0XYQer81w+rdqhxLBb7EvWaNJMhruwUowVq/gT/OCOBf1iFRmEQAgURqQ/uYagiuFgPPeCGdiYok1S9o+H5rIRcTeJlUyvigDK4GhZjvFJZ+ltsrrGsniRoZ5v9jHJIQ9CG4lq8E6HS4ECQQDWhO+rnUiHgrbvClG6Cu5BkuRWWqvoB8MzUD0Q4uvhAASZEyFqtbx1AubR/zZQIkQWO3tHlv3xXLchEuHNPYjBAkEAy8wyoUp2sOORGdhfHk+jCn0rDzo61dL2l6IIJbtMvNMHwIjDwXl1cI9SnLVsIDScmbkoq18cwj10sdXjNLgiYwJBANGvR4Z8SzUKND4b3B76KEG4j7FJF9fKHqe9urMS3HYmSlhGNtfTpM7Lc0u5JyHVHLCOm8YydS7D7c1KY6T2jQECQCHp9zr0A1BobksYwKtwoTcroTDFhejzVGnjYuu0gY6ip5WYrMrThYGXuC2v2zB40N6b+3KZP1XrmDHH4ClzwvUCQQCMuU6HbFrwP4nNv7ZOfzjWbMSj68zapR9PTRGt+/uLLZoMUK1UefjWvaxPEL7qA9mBKUJFhraDplRObItYnxkj'
//加密方法
export function RSAencrypt (pas) {
  let jse = new JSEncrypt();
  //设置公钥
  jse.setPublicKey(publicKey);

  return jse.encrypt(pas);
}

//解密方法
export function RSAdecrypt (pas) {
  let jse = new JSEncrypt();
  // 私钥
  jse.setPrivateKey(privateKey)

  return jse.decrypt(pas);
}

