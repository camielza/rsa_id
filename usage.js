var RsaId = require('./rsa_id.js')

var id = new RsaId('8001015009087')
console.log(id.toString())
if ( id.gender == RsaId.GenderEnum.FEMALE)
{
  console.log("It's a girl")
}
else {
  console.log("It's a boy")

}
