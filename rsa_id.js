
IdNumberParser.prototype.computeGender  = function(genderDigit)
{
  if ( genderDigit < 5) return IdNumberParser.GenderEnum.FEMALE;
  if ( genderDigit > 4) return IdNumberParser.GenderEnum.MALE;
}

IdNumberParser.prototype.computeCitizenShip  = function(citizenShipDigit)
{
  if ( citizenShipDigit == 0) return IdNumberParser.CitizenShipEnum.SA_CITIZEN
  return IdNumberParser.CitizenShipEnum.OTHER;
}

IdNumberParser.prototype.parse = function()
{
    if ( this.idNumber.length < 13)
    {
      throw "ID number should be 13 characters"
    }
    if ( isNaN(this.idNumber))
    {
      throw ( "ID number should consists of numerical characters only")
    }

    this.birthDateYYMMDD=this.idNumber.substring(0,6)
    this.genderDigit = this.idNumber.substring(6,7);
    this.sequenceNumber = this.idNumber.substring(7,10);
    this.citizenShipDigit = this.idNumber.substring(10,11);
    this.controlType = this.idNumber.substring(11,12);
    this.controlDigit = this.idNumber.substring(12,13);
    this.gender = this.computeGender(this.genderDigit);
    this.citizenShip = this.computeCitizenShip(this.citizenShipDigit);

}

IdNumberParser.prototype.calcCheckDigit = function()
{
  var oddSum = 0;
  [0,2,4,6,8,10].forEach(
    function(index)
    {
      oddSum+=parseInt(this.idNumber[index],10)
    },this
  )
  var evenNumStr = "";
  [1,3,5,7,9,11].forEach(
    function(index)
    {
      evenNumStr+=this.idNumber[index];
    },this
  );
  var evenNum = parseInt(evenNumStr,10);
  var evenNumTimesTwo = evenNum * 2;
  var evenSum=0
  evenNumTimesTwo.toString().split("").forEach(
    function(num)
    {
      evenSum+=parseInt(num,10)
    },this
  )
  var total = oddSum + evenSum;
  var lastDigit=total.toString().charAt(total.toString().length-1)
  var checkCalc=10-lastDigit;
  var checkDigit=checkCalc.toString().charAt(checkCalc.toString().length-1)
  return checkDigit
}

IdNumberParser.prototype.isValid = function()
{
  if ( this.controlType != 8 && this.controlType != 9)
  {
    throw "Control type not supported"+this.controlType
  }

  var checkDigit = this.calcCheckDigit();
  if ( this.controlDigit == checkDigit)
  {
    return true;
  }
  return false;
}

IdNumberParser.prototype.toString  = function()
{
  str ="ID NUMBER        :"+this.idNumber+"\n";
  str+="GENDER           :"+this.gender+"\n";
  str+="GENDER DIGIT     :"+this.genderDigit+"\n";
  str+="SEQUENCE NUM     :"+this.sequenceNumber+"\n";
  str+="BIRTHDATE        :"+this.birthDateYYMMDD+"\n";
  str+="CITIZENSHIP      :"+this.citizenShip+"\n";
  str+="CITIZENSHIP DIGIT:"+this.citizenShipDigit+"\n";
  str+="CONTROL TYPE     :"+this.controlType+"\n";
  str+="CONTROL DIGIT    :"+this.controlDigit+"\n";
  str+="VALID            :"+this.valid+"\n";
  return str;
}

function IdNumberParser(idNumber) {

  IdNumberParser.GenderEnum = {
    MALE: 1,
    FEMALE: 2
  }

  IdNumberParser.CitizenShipEnum = {
      SA_CITIZEN: 1,
      OTHER: 2
  }

  this.idNumber = idNumber;
  this.parse();
  this.valid = this.isValid();

}

id = new IdNumberParser('8001015009087')
console.log(id.toString())
if ( id.gender == IdNumberParser.GenderEnum.FEMALE)
{
  console.log("It's a girl")
}
else {
  console.log("It's a boy")

}
