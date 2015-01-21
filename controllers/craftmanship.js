'use strict';
var http = require('http');
var jsonResult;


var CraftmanshipModel = require('../models/health');
var request = require('request');
var str1;

module.exports = function (router) {

    var model = new CraftmanshipModel();


    router.get('/', function (req, res) {
      //console.log('its health');


   http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/metric/craftsmanscorecard/techleaders?Hierarchy=/hdeo&monthParam=3&metricType=ALL", function (response) {
       ////console.log("Got response: " + response.statusCode);
       //console.log("statusCode: ", response.statusCode);
       //console.log("headers: ", response.headers);
       var str = '';

       // Create the listener for data being returned.
       response.on('data', function (chunk) {
           str += chunk;
       });

        // Create the listener for the end of the GET.
       response.on('end', function (){

           //console.log(str);
            jsonResult = JSON.parse(str);
           
           //console.log("jsonresult:" + jsonResult);
           str1 = JSON.stringify(jsonResult);
           //console.log("str1" + str1);

          var ashenoy_data = [];
          var sbal_data = [];
          var ccchang_data = [];
          for (var i = 0; i < jsonResult.length; i++) {
            if (jsonResult[i].hierachyName == "/hdeo/ashenoy")
              ashenoy_data.push(jsonResult[i]);
            if (jsonResult[i].hierachyName == "/hdeo/ccchang")
              ccchang_data.push(jsonResult[i]);
            if (jsonResult[i].hierachyName == "/hdeo/sbal")
              sbal_data.push(jsonResult[i]);
            
          }
          //console.log("ashenoy_data" + ashenoy_data);
          //console.log("ashenoy_data parsed" + JSON.stringify(ashenoy_data));
          // var date_month1;
          // var date_month2;
          // var date_month3;
          var ashenoy_data_month1 = [];
          var ashenoy_data_month2 = [];
          var ashenoy_data_month3 = [];

            //sbal data

          var sbal_data_month1 = [];
          var sbal_data_month2 = [];
          var sbal_data_month3 = [];
           //ccchang data

          var ccchang_data_month1 = [];
          var ccchang_data_month2 = [];
          var ccchang_data_month3 = [];


          var total_ashenoy_m1 =0 ;
          var total_ashenoy_m2 =0 ;
          var total_ashenoy_m3 =0 ;

          var total_sbal_m1 =0 ;
          var total_sbal_m2 =0 ;
          var total_sbal_m3 =0 ;

          var total_ccchang_m1 =0 ;
          var total_ccchang_m2 =0 ;
          var total_ccchang_m3 =0 ;
          var month_Name1;
          var month_Name2;
          var month_Name3;

          //Get the month from current Date
          var d = new Date();
          var curMonth = d.getMonth();
          curMonth = curMonth + 1;
          var prevMonth;
          var prevPrevMonth;

          //console.log("Current Month = " + curMonth);
          if (curMonth == 2)
          {
            prevMonth = 1;
            prevPrevMonth = 12;
          }
          else if (curMonth == 1)
          {
            prevMonth = 12;
            prevPrevMonth = 11;
          }
          else
          {
            prevMonth = curMonth - 1;
            prevPrevMonth = curMonth - 2;
          }


          //fn call ex ***************
          var ashenoyData = [] ;

          ashenoyData = getLeaderData(ashenoy_data,curMonth,prevMonth,prevPrevMonth);
          ashenoy_data_month1 = ashenoyData.leader_data_month1;
          ashenoy_data_month2 = ashenoyData.leader_data_month2;
          ashenoy_data_month3 = ashenoyData.leader_data_month3;
          total_ashenoy_m1 = ashenoyData.total_leader_m1;
          total_ashenoy_m2 = ashenoyData.total_leader_m2;
          total_ashenoy_m3 = ashenoyData.total_leader_m3;
          //console.log("ashenoy_data_month1 is:" + ashenoy_data_month1);


          month_Name1= getMonthName(curMonth);
          month_Name2= getMonthName(prevMonth);
          month_Name3= getMonthName(prevPrevMonth);

          //console.log("Prev Month = " + prevMonth + ", prev Prev MOnth = ", prevPrevMonth);

          var sbalData = [] ;

          sbalData = getLeaderData(sbal_data,curMonth,prevMonth,prevPrevMonth);
          sbal_data_month1 = sbalData.leader_data_month1;
          sbal_data_month2 = sbalData.leader_data_month2;
          sbal_data_month3 = sbalData.leader_data_month3;
          total_sbal_m1 = sbalData.total_leader_m1;
          total_sbal_m2 = sbalData.total_leader_m2;
          total_sbal_m3 = sbalData.total_leader_m3;
          //console.log("ashenoy_data_month1 is:" + sbal_data_month1);

          var ccchangData = [] ;

          ccchangData = getLeaderData(ccchang_data,curMonth,prevMonth,prevPrevMonth);
          ccchang_data_month1 = ccchangData.leader_data_month1;
          ccchang_data_month2 = ccchangData.leader_data_month2;
          ccchang_data_month3 = ccchangData.leader_data_month3;
          total_ccchang_m1 = ccchangData.total_leader_m1;
          total_ccchang_m2 = ccchangData.total_leader_m2;
          total_ccchang_m3 = ccchangData.total_leader_m3;
          //console.log("ashenoy_data_month1 is:" + ccchang_data_month1);


          sbal_data_month1= getDefaultMissingData(sbal_data_month1);
          sbal_data_month2= getDefaultMissingData(sbal_data_month2);
          sbal_data_month3= getDefaultMissingData(sbal_data_month3);

          ccchang_data_month1= getDefaultMissingData(ccchang_data_month1);
          ccchang_data_month2= getDefaultMissingData(ccchang_data_month2);
          ccchang_data_month3= getDefaultMissingData(ccchang_data_month3);

          ashenoy_data_month1= getDefaultMissingData(ashenoy_data_month1);
          ashenoy_data_month2= getDefaultMissingData(ashenoy_data_month2);
          ashenoy_data_month3= getDefaultMissingData(ashenoy_data_month3);

          //console.log("ashenoy_data" + ashenoy_data);
          //console.log("ccchang_data" + ccchang_data);
          //console.log("sbal_data" + sbal_data);

          res.render('craftmanship',{'ashenoym1' :ashenoy_data_month1, 'ashenoym2' :ashenoy_data_month2,
            'ashenoym3' :ashenoy_data_month3,  'totalashenoym1' : total_ashenoy_m1 , 
            'totalashenoym2' : total_ashenoy_m2 ,'totalashenoym3' : total_ashenoy_m3 ,
            'sbalm1' :sbal_data_month1 , 'sbalm2' :sbal_data_month2 ,'sbalm3' :sbal_data_month3 ,
            'totalsbalm1' : total_sbal_m1 ,'totalsbalm2' : total_sbal_m2 ,'totalsbalm3' : total_sbal_m3 ,
            'ccchangm1' :ccchang_data_month1 , 'ccchangm2' :ccchang_data_month2 ,
            'ccchangm3' :ccchang_data_month3 ,'totalccchangm1' : total_ccchang_m1 , 'totalccchangm2' : total_ccchang_m2 ,
            'totalccchangm3' : total_ccchang_m3 , 'monthName1' : month_Name1 , 'monthName2' : month_Name2 ,'monthName3' : month_Name3});

      });


   });


    });
};

// fn to get month name
function getMonthName(monthNumber)
{
  switch(monthNumber)
  {
    case 1:
    return "January";

    case 2:
    return "February";
    
    case 3:
    return "March";
    
    case 4:
    return "April";
    
    case 5:
    return "May";
    
    case 6:
    return "June";
    
    case 7:
    return "July";
    
    case 8:
    return "August";
    
    case 9:
    return "September";
    
    case 10:
    return "October";
    
    case 11:
    return "November";
    
    case 12:
    return "December";
    
    default:
    return "";

  }
}

function getDefaultMissingData(ccchang_data_month1)
{
 //console.log("inside function &&&&&&"); 
if (ccchang_data_month1.length < 4)
     {
            var found_BIR = false;
            var found_OOL = false;
            var found_INTG = false;
            var found_SLA = false;
            for (var i=0; i< ccchang_data_month1.length;i++)
            {
              if (ccchang_data_month1[i].metricType == "BIR")
                found_BIR = true;
              if (ccchang_data_month1[i].metricType == "SLA")
                found_SLA = true;
              if (ccchang_data_month1[i].metricType == "INTG")
                found_INTG = true;
              if (ccchang_data_month1[i].metricType == "OOL")
                found_OOL = true;
            }
            if (!found_BIR)
            {
              var BIR= [];
              BIR.push({hierachyName:'/hdeo/ccchang',
                        metricType: 'BIR',
                            score:  '0',
                            actual: ' ',
                            dataMonth: ' ',
                            goal: ' '});
                    ccchang_data_month1= ccchang_data_month1.slice(0,1).concat(BIR).concat(ccchang_data_month1.slice(1));
            }
             if (!found_SLA)
            {
              var SLA= [];
              SLA.push({hierachyName:'/hdeo/ccchang',
                        metricType: 'SLA',
                            score:  '0',
                            actual: ' ',
                            dataMonth: ' ',
                            goal: ' '});
                    ccchang_data_month1= ccchang_data_month1.slice(0,1).concat(SLA).concat(ccchang_data_month1.slice(1));
            }
             if (!found_INTG)
            {
              var INTG= [];
              INTG.push({hierachyName:'/hdeo/ccchang',
                        metricType: 'INTG',
                            score:  '0',
                            actual: ' ',
                            dataMonth: ' ',
                            goal: ' '});
                    ccchang_data_month1= ccchang_data_month1.slice(0,1).concat(INTG).concat(ccchang_data_month1.slice(1));
            }
             if (!found_OOL)
            {
              
              var OOL= [];
              OOL.push({hierachyName:'/hdeo/ccchang',
                        metricType: 'OOL',
                            score:  '0',
                            actual: ' ',
                            dataMonth: ' ',
                            goal: ' '});
                    ccchang_data_month1= ccchang_data_month1.slice(0,1).concat(OOL).concat(ccchang_data_month1.slice(1));
            }

      }
          return ccchang_data_month1;
}

function getLeaderData(leader_data,curMonth,prevMonth,prevPrevMonth){ 

  //console.log("ashenoy_data fn" + leader_data);
  //console.log("ashenoy_data parsed fn" + JSON.stringify(leader_data));
  var leader_data_month1 = [];
  var leader_data_month2 = [];
  var leader_data_month3 = [];
  var total_leader_m1 =0;
  var total_leader_m2 =0;
  var total_leader_m3 =0;
  //console.log("Prev Month = " + prevMonth + ", prev Prev MOnth = ", prevPrevMonth);

  for(var j=0 ; j< leader_data.length; j++)
  {
    var monthFromData = leader_data[j].dataMonth.substr(10, 2);
    //console.log("monthFromData = " + monthFromData);

    if(monthFromData == curMonth)
      {
      //console.log("Month1 **************");
      leader_data_month1.push(leader_data[j]);
      
      }
    if(monthFromData == prevMonth)
      {
      //console.log("Month2 **************");
      leader_data_month2.push(leader_data[j]);
      
      }
    if(monthFromData == prevPrevMonth)
      {
      //console.log("Month3 **************");
      leader_data_month3.push(leader_data[j]);
      }

  }
          for(var j=0 ; j< leader_data_month1.length; j++)
          {
              total_leader_m1 = eval( "total_leader_m1 + parseInt(leader_data_month1[j].score)");
              //console.log("Month1 Value $$$$$" +  total_leader_m1);
          }
          total_leader_m1 = (total_leader_m1*100)/400;

          // get the total score value for month2 for ashenoy

          for(var j=0 ; j< leader_data_month2.length; j++)
          {
              total_leader_m2 = eval( "total_leader_m1 + parseInt(leader_data_month2[j].score)");
              //console.log("Month1 Value $$$$$" +  total_leader_m2);
          }
          total_leader_m2 = (total_leader_m2*100)/400;

          // get the total score value for month3 for ashenoy

          for(var j=0 ; j< leader_data_month3.length; j++)
          {
              total_leader_m3 = eval( "total_leader_m1 + parseInt(leader_data_month3[j].score)");
              //console.log("Month1 Value $$$$$" +  total_leader_m3);
          }
          total_leader_m3 = (total_leader_m3*100)/400;

  return {
    leader_data_month1: leader_data_month1,
    leader_data_month2: leader_data_month2,
    leader_data_month3: leader_data_month3,
    total_leader_m1: total_leader_m1,
    total_leader_m2: total_leader_m2,
    total_leader_m3: total_leader_m3
  }

}




