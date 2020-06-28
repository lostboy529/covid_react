      var num = 1, tm = 0;
      var max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0, check = 0;
      var unlock = [0, 0, 0, 0, 0, 0, 0, 0];
      var ini_day = 0;
      var fnl_day = 0;
      localStorage.clear();
      function formout(){
        var x = parseInt(document.getElementById("scenario").value);
        // var node = document.getElementById("main_x");
        // var node0 = document.getElementById("main_y");
        var node = document.getElementById("main_xn");
        var node0 = document.getElementById("main_yn");
        while (node.childElementCount) {
          node.removeChild(node.childNodes[0]);
          node0.removeChild(node0.childNodes[0]);
        }
        for(var i = 0; i < x; i++){
          var name = "Process_" + i;
          var name2 = "scenario_"+i+".json";
          var node1 = document.createElement("button");
          var node2 = document.createElement("div");
          node1.setAttribute("class","tablink");
          node2.setAttribute("class","tabcontent");
          var onc = "setdata(this); verifyshow(this);";
          node1.setAttribute("onclick",onc);
          node1.setAttribute("id",name+"_"+i);
          node2.setAttribute("id",name);
          node2.style.backgroundColor = "#222222";
          node1.innerText = "Scenario "+ (i+1);
          node.appendChild(node1);
          node0.appendChild(node2);
          var node3 = document.createElement("script");
          node3.setAttribute("type","text/javascript");
          node3.setAttribute("src",name2);
          node0.appendChild(node3);
        }
        if(x > 1){
          var node4 = document.createElement("button");
          node4.setAttribute("class","tablink");
          node4.setAttribute("onclick","comparex(this)");
          node4.setAttribute("id","comparex");
          node4.innerText = "Comparison";
          node4.style.visibility = "hidden";
          node.appendChild(node4);
        }
        window.scrollTo(0,0);
        document.getElementById("Process_0_0").click();
      }
      function verifyshow(elem){
        var x = parseInt(document.getElementById("scenario").value);
        for(var i = 0; i < x; i++){
          if("Process_"+i+"_"+i == elem.id){
            cleant();
            var num = i + 2;
            var dat = JSON.parse(localStorage.getItem(`dat_${i + 1}
`));
            // console.log(dat);
            if (dat !== null){
              max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
              main(dat, num);
              tooltip(1, dat);
              tooltip(2, dat);
              tooltip(5, dat);
              tooltip(7, dat);
              tooltip(8, dat);
              tooltip(9, dat);
              tooltip(10, dat);
              tooltip(11, dat);
              tooltip(13, dat);
              tooltip(14, dat);
              tooltip(15, dat);
              tooltip(16, dat);
              max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
            }
          }
        }
      }
      function tooltip(num, data){
        var graph = document.getElementById("chart-"+num);
        var det = 0;
        if(fnl_day > data.length){
          det = data.length;
        }
        else{
          det = fnl_day;
        }
        var day = det - ini_day;
        // var wid = graph.offsetWidth;
        graph.addEventListener("mousemove", (function(evt) {
          var rect = evt.target.getBoundingClientRect();
          // console.log(rect.width);
          var grad = rect.width/day;
          var x = evt.clientX - rect.left;
          var y = evt.clientY - rect.top;
          var cur_day = ini_day + Math.round(x/grad);
          // console.log(cur_day);
          // console.log(data[cur_day - 1]);
          document.getElementById("t1").innerText = "Day "+cur_day;
          document.getElementById("t2").innerText = "Day "+cur_day;
          document.getElementById("t5").innerText = "Day "+cur_day;
          document.getElementById("t7").innerText = "Day "+cur_day;
          document.getElementById("t8").innerText = "Day "+cur_day;
          document.getElementById("t9").innerText = "Day "+cur_day;
          document.getElementById("t10").innerText = "Day "+cur_day;
          document.getElementById("t11").innerText = "Day "+cur_day;
          document.getElementById("t13").innerText = "Day "+cur_day;
          document.getElementById("t14").innerText = "Day "+cur_day;
          document.getElementById("t15").innerText = "Day "+cur_day;
          document.getElementById("t16").innerText = "Day "+cur_day;
          document.getElementById("tt1").innerText = data[cur_day - 1].Cumulative;
          document.getElementById("tt2").innerText = data[cur_day - 1].Deaths;
          document.getElementById("tt5").innerText = data[cur_day - 1].Hospitalized;
          document.getElementById("tt7").innerText = data[cur_day - 1].Recoveries;
          document.getElementById("tt8").innerText = data[cur_day - 1].Cumulative - data[cur_day - 1].Deaths - data[cur_day - 1].Recoveries;
          document.getElementById("tt9").innerText = data[cur_day - 1].Free;
          document.getElementById("tt10").innerText = data[cur_day - 1].Isolated;
          document.getElementById("tt11").innerText = data[cur_day - 1].ICU;
          document.getElementById("tt13").innerText = data[cur_day - 1].loss_Total;
          document.getElementById("tt14").innerText = data[cur_day - 1].loss_Died;
          document.getElementById("tt15").innerText = data[cur_day - 1].loss_Infected;
          document.getElementById("tt16").innerText = data[cur_day - 1].loss_idle;
        }
                                            ), false);
      }
      function tooltipx(num, data, color){
        var det = 0;
        if(fnl_day > data.length){
          det = data.length;
        }
        else{
          det = fnl_day;
        }
        console.log("color-" + color);
        var graph = document.getElementById("chart-"+num);
        var day = det - ini_day;
        // var wid = graph.offsetWidth;
        graph.addEventListener("mousemove", (function(evt) {
          var rect = evt.target.getBoundingClientRect();
          // console.log(rect.width);
          var grad = rect.width/day;
          var x = evt.clientX - rect.left;
          var y = evt.clientY - rect.top;
          var cur_day = ini_day + Math.round(x/grad);
          if(cur_day == -Infinity){
            cur_day = 0;
          }
          // console.log(cur_day);
          // console.log(data[cur_day - 1]);
          document.getElementById("t1").innerText = "Day "+cur_day;
          document.getElementById("t2").innerText = "Day "+cur_day;
          document.getElementById("t5").innerText = "Day "+cur_day;
          document.getElementById("t7").innerText = "Day "+cur_day;
          document.getElementById("t8").innerText = "Day "+cur_day;
          document.getElementById("t9").innerText = "Day "+cur_day;
          document.getElementById("t10").innerText = "Day "+cur_day;
          document.getElementById("t11").innerText = "Day "+cur_day;
          document.getElementById("t13").innerText = "Day "+cur_day;
          document.getElementById("t14").innerText = "Day "+cur_day;
          document.getElementById("t15").innerText = "Day "+cur_day;
          document.getElementById("t16").innerText = "Day "+cur_day;
          document.getElementById("tt1").innerText = "";
          document.getElementById("tt2").innerText = "";
          document.getElementById("tt5").innerText = "";
          document.getElementById("tt7").innerText = "";
          document.getElementById("tt8").innerText = "";
          document.getElementById("tt9").innerText = "";
          document.getElementById("tt10").innerText = "";
          document.getElementById("tt11").innerText = "";
          document.getElementById("tt13").innerText = "";
          document.getElementById("tt14").innerText = "";
          document.getElementById("tt15").innerText = "";
          document.getElementById("tt16").innerText = "";
          document.getElementById("tt1"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].Cumulative;
          document.getElementById("tt2"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].Deaths;
          document.getElementById("tt5"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].Hospitalized;
          document.getElementById("tt7"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].Recoveries;
          document.getElementById("tt8"+"color-"+color).innerHTML = "Scenario "+color+": " + (data[cur_day - 1].Cumulative - data[cur_day - 1].Deaths - data[cur_day - 1].Recoveries);
          document.getElementById("tt9"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].Free;
          document.getElementById("tt10"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].Isolated;
          document.getElementById("tt11"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].ICU;
          document.getElementById("tt13"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].loss_Total;
          document.getElementById("tt14"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].loss_Died;
          document.getElementById("tt15"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].loss_Infected;
          document.getElementById("tt16"+"color-"+color).innerHTML = "Scenario "+color+": " + data[cur_day - 1].loss_idle;
          document.getElementById("tt1"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt2"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt5"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt7"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt8"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt9"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt10"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt11"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt13"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt14"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt15"+"color-"+color).style.display = "inline-block";
          document.getElementById("tt16"+"color-"+color).style.display = "inline-block";
        }
                                            ), false);
      }
      // function btnset()
      function setdata(elem){
        document.getElementById("scen_form_1").style.display = "none";
        document.getElementById("scen_form_2").style.display = "none";
        document.getElementById("scen_form_3").style.display = "none";
        document.getElementById("scen_form_4").style.display = "none";
        document.getElementById("scen_form_5").style.display = "none";
        document.getElementById("scen_form_6").style.display = "none";
        document.getElementById("scen_form_7").style.display = "none";
        document.getElementById("scen_form_8").style.display = "none";
        cleant();
        var x = parseInt(document.getElementById("scenario").value);
        for(var i = 0; i < x; i++){
          var name2 = "scenario_"+i+".json";
          var name = "Process_"+i;
          if((name+"_"+i) == elem.id){
            document.getElementById("scen_form_"+(i+1)).style.display = "block";
            if(unlock[i] == 1){
              num = i + 2;
              //     fetch(name2).then(function(resp){
              //   return resp.json();
              //    }).then(function(data){
              // });
              var dat = JSON.parse(localStorage.getItem(`dat_${i + 1}
`));
              // console.log(dat);
              if (dat !== null){
                cleant();
                max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
                main(dat, num);
                tooltip(1, dat);
                tooltip(2, dat);
                tooltip(5, dat);
                tooltip(7, dat);
                tooltip(8, dat);
                tooltip(9, dat);
                tooltip(10, dat);
                tooltip(11, dat);
                tooltip(13, dat);
                tooltip(14, dat);
                tooltip(15, dat);
                tooltip(16, dat);
                max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
              }
            }
          }
        }
        // setmax();
        cleant();
        if(document.getElementById("gra9").checked){
          document.getElementById("circle-1").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-1").style.display = "none";
        }
        if(document.getElementById("gra10").checked){
          document.getElementById("circle-2").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-2").style.display = "none";
        }
        if(document.getElementById("gra11").checked){
          document.getElementById("circle-4").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-4").style.display = "none";
        }
        if(document.getElementById("gra12").checked){
          document.getElementById("circle-3").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-3").style.display = "none";
        }
        document.getElementById("top1").style.display = "inline-block";
        document.getElementById("top2").style.display = "inline-block";
        document.getElementById("top3").style.display = "inline-block";
        document.getElementById("top4").style.display = "inline-block";
        document.getElementById("cx1").style.display = "none";
        document.getElementById("cx2").style.display = "none";
        document.getElementById("cx5").style.display = "none";
        document.getElementById("cx7").style.display = "none";
        document.getElementById("cx8").style.display = "none";
        document.getElementById("cx9").style.display = "none";
        document.getElementById("cx10").style.display = "none";
        document.getElementById("cx11").style.display = "none";
        document.getElementById("cx13").style.display = "none";
        document.getElementById("cx14").style.display = "none";
        document.getElementById("cx15").style.display = "none";
        document.getElementById("cx16").style.display = "none";
        openPage('Sim-x',elem,'#222222');
      }
      function sim_act(elem){
        var x = parseInt(elem.id.split("_")[2]);
        var ch = 0;
        console.log("I am called", x)
        for(var i = x-1; i < x; i++){
          var name2 = "scenario_"+i+".json";
          var name = "sim_scen_";
          if((name+(i+1)) == elem.id){
            unlock[i] = 1;
            num = i + 2;
            document.getElementById("scen_form_"+(i+1)).style.display = "block";
            check++;
            cleant();
            if(check>1){
              document.getElementById("comparex").style.visibility = "visible";
            }
            let data = {
              ...JSON.parse(localStorage.getItem("data")),
              lockdownDays: parseInt($("#lock_start_" + String(i + 1)).val()),
              socialDistRatio: parseFloat($("#lock_period_" + String(i + 1)).val()),
            };
            console.log(data);
            var uuid = "";
            $.ajax({
              url: "http://ecoprojectkgp.herokuapp.com/paramgraph", 
              data: JSON.stringify(data),
              type: 'post',
              success: (res) => {
                console.log(res);
                uuid = res.id;
                console.log(uuid);
                console.log(status);
              }
              ,
              dataType: "json",
              contentType: "application/json"
            }
                  );
            var intervalVar;
            intervalVar = setInterval(() => {
              fetch("http://ecoprojectkgp.herokuapp.com/paramgraph?id=" + uuid)
                .then(function(resp){
                return resp.json();
              }
                     )
                .then(function(data){
                if (data.message !== undefined)
                  return;
                dat = data.map((elt) => {
                  let convElt = {
                    "Day": elt.day,
                    "Cumulative": elt.cumulativeTrueCases,
                    "Free": elt.free,
                    "Quarentined": elt.quarantined,
                    "Isolated": elt.isolated,
                    "Hospitalized": elt.hospitalized,
                    "ICU": elt.icu,
                    "Recoveries": elt.recoveries,
                    "Deaths": elt.deaths,
                    "Rough Repo Number": elt.roughRepoNumber,
                    "Commerce_fracn_func": elt.commerce_fracn_func,
                    "Education_fracn_func": elt.education_fracn_func,
                    "Healthcare_fracn_func": elt.healthcare_fracn_func,
                    "Office_fracn_func": elt.office_fracn_func,
                    "loss_Died": elt.loss_Died,
                    "loss_Infected": elt.loss_Infected,
                    "loss_Total": elt.loss_Total,
                    "loss_Total_today": elt.loss_Total_today,
                    "loss_idle": elt.loss_idle
                  }
                  return convElt;
                }
                              );
                // console.log(dat);
                if(dat !== null)
                  ch++;
                localStorage.setItem(`dat_${x}
`, JSON.stringify(dat));
                if(dat !== null && ch == 1){
                  num = i+2;
                  max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
                  main(dat, num);
                  document.getElementById("Process_"+(i-1)+"_"+(i-1)).click();
                  tooltip(1, dat);
                  tooltip(2, dat);
                  tooltip(5, dat);
                  tooltip(7, dat);
                  tooltip(8, dat);
                  tooltip(9, dat);
                  tooltip(10, dat);
                  tooltip(11, dat);
                  tooltip(13, dat);
                  tooltip(14, dat);
                  tooltip(15, dat);
                  tooltip(16, dat);
                  max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
                }
                clearInterval(intervalVar);
              }
                     );
            }
                                      , 500);
          }
        }
      }
      async function comparex(elem){
        var dat = [];
        cleant();
        document.getElementById("scen_form_1").style.display = "none";
        document.getElementById("scen_form_2").style.display = "none";
        document.getElementById("scen_form_3").style.display = "none";
        document.getElementById("scen_form_4").style.display = "none";
        document.getElementById("scen_form_5").style.display = "none";
        document.getElementById("scen_form_6").style.display = "none";
        document.getElementById("scen_form_7").style.display = "none";
        document.getElementById("scen_form_8").style.display = "none";
        max_1 = 0, max_2 = 0, max_5 = 0, max_7 = 0, max_8 = 0, max_9 = 0, max_10 = 0, max_11 = 0, max_13 = 0, max_14 = 0, max_15 = 0, max_16 = 0;
        var x = parseInt(document.getElementById("scenario").value);
        for(var i = 0; i < x; i++){
          if(unlock[i]==1){
            var name2 = "scenario_"+i+".json";
            setmax();
            console.log(i);
            num = i + 2;
            var color = (i+1);
            dat = JSON.parse(localStorage.getItem(`dat_${i + 1}
`));
            console.log(num);
            main(dat, num);
            tooltipx(1, dat, color);
            tooltipx(2, dat, color);
            tooltipx(5, dat,color);
            tooltipx(7, dat, color);
            tooltipx(8, dat, color);
            tooltipx(9, dat,color);
            tooltipx(10, dat,color);
            tooltipx(11, dat,color);
            tooltipx(13, dat, color);
            tooltipx(14, dat, color);
            tooltipx(15, dat,color);
            tooltipx(16, dat, color);
            // await fetch(name2).then(function(resp){
            //   return resp.json();
            // }).then(function(data){
            //   dat = data;
            //   console.log(num);
            //   main(dat, num);
            //   tooltipx(1, dat, color);tooltipx(2, dat, color);tooltipx(5, dat,color);tooltipx(7, dat, color);tooltipx(8, dat, color);tooltipx(9, dat,color);tooltipx(10, dat,color);tooltipx(11, dat,color);
            //   tooltipx(13, dat, color);tooltipx(14, dat, color);tooltipx(15, dat,color);tooltipx(16, dat, color);
            // });
          }
        }
        document.getElementById("circle-1").style.display = "none";
        document.getElementById("circle-2").style.display = "none";
        document.getElementById("circle-3").style.display = "none";
        document.getElementById("circle-4").style.display = "none";
        document.getElementById("top1").style.display = "none";
        document.getElementById("top2").style.display = "none";
        document.getElementById("top3").style.display = "none";
        document.getElementById("top4").style.display = "none";
        document.getElementById("cx1").style.display = "block";
        document.getElementById("cx2").style.display = "block";
        document.getElementById("cx5").style.display = "block";
        document.getElementById("cx7").style.display = "block";
        document.getElementById("cx8").style.display = "block";
        document.getElementById("cx9").style.display = "block";
        document.getElementById("cx10").style.display = "block";
        document.getElementById("cx11").style.display = "block";
        document.getElementById("cx13").style.display = "block";
        document.getElementById("cx14").style.display = "block";
        document.getElementById("cx15").style.display = "block";
        document.getElementById("cx16").style.display = "block";
        openPage('Sim-x',elem,'#222222');
      }
      function setmax(){
        var x = parseInt(document.getElementById("scenario").value);
        for(var i = 0; i < x; i++){
          var datax = JSON.parse(localStorage.getItem(`dat_${i + 1}
`));
          if(datax !== null){
            setm(datax);
          }
          // var name2 = "scenario_"+i+".json";
          // fetch(name2).then(function(resp){
          //   return resp.json();
          // }).then(function(data){
          //   datax = data;
          // });
        }
      }
      function loading(elem){
        var x = parseInt(document.getElementById("scenario").value);
        if(elem != null){
          for(var i = 1, j = 0; i <= x; i++, j++){
            if("sim_scen_"+i == elem.id){
              document.getElementById("loading_"+j).style.display = "block";
              document.getElementById("loading_success_"+j).style.display = "none";
            }
          }
        }
        else{
          for(var i = 0; i < x; i++){
            var datax = JSON.parse(localStorage.getItem(`dat_${i + 1}
`));
            if(datax !== null){
              document.getElementById("loading_"+i).style.display = "none";
              document.getElementById("loading_success_"+i).style.display = "block";
            }
          }
        }
      }
      function setm(datax){
        var det = 0;
        if(fnl_day > datax.length){
          det = datax.length;
        }
        else{
          det = fnl_day;
        }
        for(var k = ini_day - 1; k < det; k++){
          if(max_1 < datax[k].Cumulative)
            max_1 = datax[k].Cumulative;
          if(max_2 < datax[k].Deaths)
            max_2 = datax[k].Deaths;
          if(max_5 < datax[k].Hospitalized)
            max_5 = datax[k].Hospitalized;
          if(max_7 < datax[k].Recoveries)
            max_7 = datax[k].Recoveries;
          if(max_8 < datax[k].Cumulative - datax[k].Recoveries - datax[k].Deaths)
            max_8 = datax[k].Cumulative - datax[k].Recoveries - datax[k].Deaths;
          if(max_9 < datax[k].Free)
            max_9 = datax[k].Free;
          if(max_10 < datax[k].Isolated)
            max_10 = datax[k].Isolated;
          if(max_11 < datax[k].ICU)
            max_11 = datax[k].ICU;
          if(max_13 < datax[k].loss_Total)
            max_13 = datax[k].loss_Total;
          if(max_14 < datax[k].loss_Died)
            max_14 = datax[k].loss_Died;
          if(max_15 < datax[k].loss_Infected)
            max_15 = datax[k].loss_Infected;
          if(max_16 < datax[k].loss_idle)
            max_16 = datax[k].loss_idle;
        }
      }
      function setlegendy(max, id){
        var hieght = document.getElementById(id).clientHeight;
        var node1 = document.getElementById(id+"yy");
        var node2 = document.getElementById(id+"y");
        var prefix = "";
        var div = 1;
        if(max >= 1000 && max < 1000000){
          prefix = "k";
          div = 1000;
        }
        else if(max >= 1000000 && max < 1000000000){
          prefix = "M";
          div = 1000000;
        }
        else if(max >= 1000000000){
          prefix = "B";
          div = 1000000000;
        }
        node1.innerHTML = (max/div).toFixed(2) + prefix;
        while(node2.childElementCount){
          node2.removeChild(node2.childNodes[0]);
        }
        for(var i = 4; i > 0; i = i - 1){
          var node = document.createElement("div");
          node.innerHTML = (i*max/(5*div)).toFixed(2) + prefix;
          node.style.position = "relative";
          node.style.padding = "0px"
          node.style.marginTop = hieght/6 - (4-i)*3.5 + "px";
          // node2.appendChild(br);
          // var br1 = document.createElement("br");
          // var br2 = document.createElement("br");
          // var br3 = document.createElement("br");
          // node2.appendChild(br1);
          // node2.appendChild(br2);
          // node2.appendChild(br3);
          node2.appendChild(node);
        }
      }
      function setlegendx(data){
        var det = 0;
        if(fnl_day > data.length){
          det = data.length;
        }
        else{
          det = fnl_day;
        }
        var day = det - ini_day;
        var name = "" + ini_day;
        for(var i = 1; i <=10; i++){
          name = name + "           "+ (ini_day + Math.round(day*i/10));
        }
        document.getElementById("chart-1x").innerHTML = name;
        document.getElementById("chart-2x").innerHTML = name;
        document.getElementById("chart-5x").innerHTML = name;
        document.getElementById("chart-7x").innerHTML = name;
        document.getElementById("chart-8x").innerHTML = name;
        document.getElementById("chart-9x").innerHTML = name;
        document.getElementById("chart-10x").innerHTML = name;
        document.getElementById("chart-11x").innerHTML = name;
        document.getElementById("chart-13x").innerHTML = name;
        document.getElementById("chart-14x").innerHTML = name;
        document.getElementById("chart-15x").innerHTML = name;
        document.getElementById("chart-16x").innerHTML = name;
      }
      function clean(graph, id){
        var parent = document.getElementById(graph), i = parent.childNodes.length;
        if(id == 1){
          while(i--){
            if (parent.childNodes[i].tagName === 'path' || parent.childNodes[i].tagName === 'g' || parent.childNodes[i].tagName === 'polygon')
              parent.removeChild(parent.childNodes[i]);
          }
        }
        else{
          var alph = document.getElementsByClassName("underlay");
          var xx = true;
          while (i--){
            for(var j = 0; j < alph.length; j++){
              if(parent.childNodes[i] === alph[j]){
                xx = false;
                break;
              }
            }
            if (parent.childNodes[i].tagName === 'path' && xx)
              parent.removeChild(parent.childNodes[i]);
          }
        }
      }
      function cleant(){
        clean("chart-1", 1);
        clean("chart-2", 1);
        clean("chart-3", 0);
        clean("chart-4", 0);
        clean("chart-5", 1);
        clean("chart-6", 0);
        clean("chart-7", 1);
        clean("chart-8", 1);
        clean("chart-9", 1);
        clean("chart-10", 1);
        clean("chart-11", 1);
        clean("chart-12", 0);
        clean("chart-13", 1);
        clean("chart-14", 1);
        clean("chart-15", 1);
        clean("chart-16", 1);
        document.getElementById("tot_cases").innerHTML = "";
        document.getElementById("act_cases").innerHTML = "";
        document.getElementById("rec_cases").innerHTML = "";
        document.getElementById("dead_cases").innerHTML = "";
      }
      function main(datax, color){
        loading(null);
        // cleant();
        var chart_h = 40;
        var chart_w = 80;
        var stepX = 80 / 20;
        var chart_1_y = [];
        var chart_2_y = [];
        var chart_5_y = [];
        var chart_6_y = [];
        var chart_7_y = [];
        var chart_8_y = [];
        var chart_9_y = [];
        var chart_10_y = [];
        var chart_11_y = [];
        var chart_13_y = [];
        var chart_14_y = [];
        var chart_15_y = [];
        var chart_16_y = [];
        var act_points_1 = [], act_points_2 = [], act_points_3 = [], act_points_4 = [], act_points_5 = [], act_points_6 = [], act_points_7 = [], act_points_8 = [];
        var act_points_9 = [], act_points_10 = [], act_points_11 = [], act_points_12 = [];
        var det = 0;
        if(fnl_day > datax.length){
          det = datax.length;
        }
        else{
          det = fnl_day;
        }
        for(var k = ini_day; k < det; k++){
          if(max_1 < datax[k].Cumulative)
            max_1 = datax[k].Cumulative;
          if(max_2 < datax[k].Deaths)
            max_2 = datax[k].Deaths;
          if(max_5 < datax[k].Hospitalized)
            max_5 = datax[k].Hospitalized;
          if(max_7 < datax[k].Recoveries)
            max_7 = datax[k].Recoveries;
          if(max_8 < datax[k].Cumulative - datax[k].Recoveries - datax[k].Deaths)
            max_8 = datax[k].Cumulative - datax[k].Recoveries - datax[k].Deaths;
          if(max_9 < datax[k].Free)
            max_9 = datax[k].Free;
          if(max_10 < datax[k].Isolated)
            max_10 = datax[k].Isolated;
          if(max_11 < datax[k].ICU)
            max_11 = datax[k].ICU;
          if(max_13 < Math.round(datax[k].loss_Total));
          max_13 = Math.round(datax[k].loss_Total);
          if(max_14 < Math.round(datax[k].loss_Died))
            max_14 = Math.round(datax[k].loss_Died);
          if(max_15 < Math.round(datax[k].loss_Infected))
            max_15 = Math.round(datax[k].loss_Infected);
          if(max_16 < Math.round(datax[k].loss_idle))
            max_16 = Math.round(datax[k].loss_idle);
        }
        setlegendx(datax);
        setlegendy(max_1,"chart-1");
        setlegendy(max_2,"chart-2");
        setlegendy(max_5,"chart-5");
        setlegendy(max_7,"chart-7");
        setlegendy(max_8,"chart-8");
        setlegendy(max_9,"chart-9");
        setlegendy(max_10,"chart-10");
        setlegendy(max_11,"chart-11");
        setlegendy(max_13,"chart-13");
        setlegendy(max_14,"chart-14");
        setlegendy(max_15,"chart-15");
        setlegendy(max_16,"chart-16");
        for(var k = ini_day; k < det; k++){
          act_points_1.push(datax[k].Cumulative);
          act_points_2.push(datax[k].Deaths);
          act_points_3.push(datax[k].Hospitalized);
          act_points_4.push(datax[k].Recoveries);
          act_points_5.push(datax[k].Cumulative);
          act_points_6.push(datax[k].Free);
          act_points_7.push(datax[k].Isolated);
          act_points_8.push(datax[k].ICU);
          act_points_9.push(Math.round(datax[k].loss_Total));
          act_points_10.push(Math.round(datax[k].loss_Died));
          act_points_11.push(Math.round(datax[k].loss_Infected));
          act_points_12.push(Math.round(datax[k].loss_idle));
          chart_1_y.push(datax[k].Cumulative * 100/max_1);
          chart_6_y.push(60);
          chart_2_y.push(datax[k].Deaths *100/max_2);
          chart_5_y.push(datax[k].Hospitalized*100/max_5);
          chart_7_y.push(datax[k].Recoveries*100/max_7);
          chart_8_y.push((datax[k].Cumulative - datax[k].Recoveries - datax[k].Deaths)*100/max_8);
          chart_9_y.push(datax[k].Free *100/max_9);
          chart_10_y.push(datax[k].Isolated *100/max_10);
          chart_11_y.push(datax[k].ICU *100/max_11);
          chart_13_y.push(datax[k].loss_Total *100/max_13);
          chart_14_y.push(datax[k].loss_Died*100/max_14);
          chart_15_y.push(datax[k].loss_Infected*100/max_15);
          chart_16_y.push(datax[k].loss_idle*100/max_16);
        }
        function point(x, y) {
          x: 0;
          y: 0;
        }
        /* DRAW GRID */
        function drawGrid(graph) {
          var graph = Snap(graph);
          var g = graph.g();
          g.attr('id', 'grid');
          for (i = 0; i <= stepX + 5; i++) {
            var horizontalLine = graph.path(
              "M" + 0 + "," + stepX * i + " " +
              "L" + 80 + "," + stepX * i);
            horizontalLine.attr('class', 'horizontal');
            g.add(horizontalLine);
          };
          for (i = 0; i <= 20; i++) {
            var horizontalLine = graph.path(
              "M" + stepX * i + "," + 38.7 + " " +
              "L" + stepX * i + "," + 0);
            horizontalLine.attr('class', 'vertical');
            g.add(horizontalLine);
          };
        }
        drawGrid('#chart-5');
        drawGrid('#chart-2');
        drawGrid('#chart-1');
        drawGrid('#chart-7');
        drawGrid('#chart-8');
        drawGrid('#chart-9');
        drawGrid('#chart-10');
        drawGrid('#chart-11');
        drawGrid('#chart-13');
        drawGrid('#chart-14');
        drawGrid('#chart-15');
        drawGrid('#chart-16');
        function drawLineGraph(graph, points, container, id, act_points) {
          var graph = Snap(graph);
          /*END DRAW GRID*/
          /* PARSE POINTS */
          var myPoints = [];
          var shadowPoints = [];
          function parseData(points) {
            // clean("chart-1");clean("chart-2");clean("chart-5");clean("chart-7");clean("chart-8");clean("chart-9");clean("chart-10");clean("chart-11");
            for (i = 0; i < points.length; i++) {
              var p = new point();
              var pv = points[i] / 100 * 40;
              p.x = 83.7 / points.length * i + 1;
              p.y = 40 - pv;
              // if (p.x > 78) {
              //   p.x = 78;
              // }
              myPoints.push(p);
            }
          }
          var segments = [];
          function createSegments(p_array) {
            for (i = 0; i < p_array.length; i++) {
              var seg = "L" + p_array[i].x + "," + p_array[i].y;
              if (i === 0) {
                seg = "M" + p_array[i].x + "," + p_array[i].y;
              }
              segments.push(seg);
            }
          }
          function joinLine(segments_array, id) {
            var line = segments_array.join(" ");
            var line = graph.path(line);
            line.attr('id', 'graph-' + id);
            var lineLength = line.getTotalLength();
            line.attr({
              'stroke-dasharray': lineLength,
              'stroke-dashoffset': lineLength }
                     );
          }
          function calculatePercentage(act_points, graph) {
            var initValue = act_points[act_points.length - 2];
            var endValue = act_points[act_points.length - 1];
            var sum = Math.round(endValue - initValue);
            var prefix;
            var percentageGain;
            var stepCount = 1300 / (act_points[act_points.length - 1] - act_points[0]);
            function findPrefix() {
              if (sum > 0) {
                prefix = "+";
              }
              else {
                prefix = "-";
              }
            }
            var percentagePrefix = "";
            function percentageChange() {
              percentageGain = (endValue - initValue) / endValue * 100;
              // if (percentageGain > 100) {
              //   percentageGain = Math.round(percentageGain * 100 * 10) / 100;
              // } else if (percentageGain < 100) {
              //   percentageGain = Math.round(percentageGain * 10) / 10;
              // }
              if (initValue > endValue) {
                percentageGain = endValue / initValue * 100 - 100;
                percentageGain = percentageGain.toFixed(3);
                percentagePrefix = "";
                $(graph).find('.percentage-value').addClass('negative');
              }
              else {
                percentagePrefix = "+";
              }
              if (endValue > initValue) {
                percentageGain = (endValue - initValue) / initValue * 100;
                percentageGain = percentageGain.toFixed(3);
                // percentageGain = Math.round(percentageGain);
                if(initValue == 0 && endValue == 0){
                  percentageGain = 0;
                }
              }
            };
            percentageChange();
            findPrefix();
            var percentage = $(graph).find('.percentage-value');
            var totalGain = $(graph).find('.total-gain');
            var hVal = $(graph).find('.h-value');
            function count(graph, sum) {
              var totalGain = $(graph).find('.total-gain');
              var i = 0;
              var time = 1300;
              var intervalTime = Math.abs(time / sum);
              var timerID = 0;
              if (sum > 0) {
                var timerID = setInterval(function () {
                  i++;
                  // totalGain.text(percentagePrefix + i);
                  if (i === sum) clearInterval(timerID);
                }
                                          , intervalTime);
              }
              else if (sum < 0) {
                var timerID = setInterval(function () {
                  i--;
                  // totalGain.text(percentagePrefix + i);
                  if (i === sum) clearInterval(timerID);
                }
                                          , intervalTime);
              }
            }
            count(graph, sum);
            // percentage.text(percentagePrefix + percentageGain + "%");
            // totalGain.text("0");
            setTimeout(function () {
              percentage.addClass('visible');
              hVal.addClass('visible');
            }
                       , 1300);
          }
          function showValues() {
            var val1 = $(graph).find('.h-value');
            var val2 = $(graph).find('.percentage-value');
            val1.addClass('visible');
            val2.addClass('visible');
          }
          function drawPolygon(segments, id) {
            var lastel = segments[segments.length - 1];
            var polySeg = segments.slice();
            polySeg.push([78, 38.4], [1, 38.4]);
            var polyLine = polySeg.join(' ').toString();
            var replacedString = polyLine.replace(/L/g, '').replace(/M/g, "");
            var poly = graph.polygon(replacedString);
            var clip = graph.rect(-80, 0, 80, 40);
            poly.attr({
              'id': 'poly-' + id,
              /*'clipPath':'url(#clip)'*/
              'clipPath': clip }
                     );
            clip.animate({
              transform: 't80,0' }
                         ,
                         1300, mina.linear);
          }
          parseData(points);
          createSegments(myPoints);
          calculatePercentage(act_points, container);
          joinLine(segments, id);
          drawPolygon(segments, id);
          /*$('#poly-'+id).attr('class','show');*/
          /* function drawPolygon(segments,id){
                                             var polySeg = segments;
                                             polySeg.push([80,40],[0,40]);
                                             var polyLine = segments.join(' ').toString();
                                             var replacedString = polyLine.replace(/L/g,'').replace(/M/g,"");
                                             var poly = graph.polygon(replacedString);
                                             poly.attr('id','poly-'+id)
                                           }
                                           drawPolygon(segments,id);*/
        }
        function drawCircle(container, id, progress, parent) {
          var paper = Snap(container);
          var prog = paper.path("M5,50 A45,45,0 1 1 95,50 A45,45,0 1 1 5,50");
          var lineL = prog.getTotalLength();
          var oneUnit = lineL / 100;
          var toOffset = lineL - oneUnit *  Math.round(progress);
          var myID = 'circle-graph-' + id;
          prog.attr({
            'stroke-dashoffset': lineL,
            'stroke-dasharray': lineL,
            'id': myID }
                   );
          var animTime = 1300;
          /*progress / 100*/
          prog.animate({
            'stroke-dashoffset': toOffset }
                       ,
                       animTime, mina.easein);
          function countCircle(animtime, parent, progress) {
            var textContainer = $(parent).find('.circle-percentage');
            var i = 0;
            var time = 1300;
            var intervalTime = Math.abs(time / Math.round(progress));
            if(Math.round(progress) == 0){
              intervalTime = 1;
              i = -1;
            }
            var timerID = setInterval(function () {
              i++;
              if (i === Math.round(progress)) {
                clearInterval(timerID);
                textContainer.text(progress + "%");
              }
            }
                                      , intervalTime);
          }
          countCircle(animTime, parent, progress);
        }
        /*$(window).on('load', function () {*/
        drawCircle('#chart-3', 1, ((datax[datax.length-1].Recoveries/datax[datax.length-1].Cumulative)*100).toFixed(2), '#circle-1');
        drawCircle('#chart-4', 2, ((datax[datax.length-1].Deaths/datax[datax.length-1].Cumulative)*100).toFixed(2), '#circle-2');
        drawCircle('#chart-6', 2, ((datax[datax.length-1].Hospitalized/datax[datax.length-1].Cumulative)*100).toFixed(2), '#circle-3');
        drawCircle('#chart-12', 1,(((datax[datax.length-1].Cumulative - datax[datax.length-1].Recoveries - datax[datax.length-1].Deaths)/datax[datax.length-1].Cumulative)*100).toFixed(2), '#circle-4');
        drawLineGraph('#chart-1', chart_1_y, '#graph-1-container', color, act_points_1);
        drawLineGraph('#chart-2', chart_2_y, '#graph-2-container', color, act_points_2);
        if(tm == 0){
          drawLineGraph('#chart-5', chart_6_y, '#graph-5-container', 0, act_points_3);
        }
        tm++;
        drawLineGraph('#chart-5', chart_5_y, '#graph-5-container', color, act_points_3);
        drawLineGraph('#chart-7', chart_7_y, '#graph-7-container', color, act_points_4);
        drawLineGraph('#chart-8', chart_8_y, '#graph-8-container', color, act_points_5);
        drawLineGraph('#chart-9', chart_9_y, '#graph-9-container', color, act_points_6);
        drawLineGraph('#chart-10', chart_10_y, '#graph-10-container', color, act_points_7);
        drawLineGraph('#chart-11', chart_11_y, '#graph-11-container', color, act_points_8);
        drawLineGraph('#chart-13', chart_13_y, '#graph-13-container', color, act_points_9);
        drawLineGraph('#chart-14', chart_14_y, '#graph-14-container', color, act_points_10);
        drawLineGraph('#chart-15', chart_15_y, '#graph-15-container', color, act_points_11);
        drawLineGraph('#chart-16', chart_16_y, '#graph-16-container', color, act_points_12);
        document.getElementById("tot_cases").innerText = datax[datax.length-1].Cumulative;
        document.getElementById("act_cases").innerText = datax[datax.length-1].Cumulative - datax[datax.length-1].Recoveries - datax[datax.length-1].Deaths;
        document.getElementById("rec_cases").innerText = datax[datax.length-1].Recoveries;
        document.getElementById("dead_cases").innerText = datax[datax.length-1].Deaths;
        /*});*/
      }
      function openPage(pageName,elmnt,color) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = "";
        }
        document.getElementById(pageName).style.display = "block";
        elmnt.style.backgroundColor = color;
      }
      // Get the element with id="defaultOpen" and click on it
      document.getElementById("defaultOpen").click();
      function addChildDiv(n) {
        var parent = document.getElementById("flexbox");
        while (parent.childElementCount) {
          parent.removeChild(parent.childNodes[0]);
        }
        for (var i = 0; i < n; i++) {
          // create table data
          var node_table = document.createElement("table");
          // label
          var node_tr = document.createElement("tr");
          var child_node = document.createElement("label");
          child_node.setAttribute("for", "population");
          var text_node = document.createTextNode("Population");
          child_node.appendChild(text_node);
          var node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // input
          child_node = document.createElement("input");
          child_node.setAttribute("type", "number");
          child_node.setAttribute("id", "population");
          child_node.setAttribute("value", "100000");
          node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // inserting tr into table
          node_table.appendChild(node_tr);
          // label
          var node_tr = document.createElement("tr");
          var child_node = document.createElement("label");
          child_node.setAttribute("for", "density");
          var text_node = document.createTextNode("Density");
          child_node.appendChild(text_node);
          var node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // input
          child_node = document.createElement("input");
          child_node.setAttribute("type", "number");
          child_node.setAttribute("id", "density");
          child_node.setAttribute("value", "200");
          node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // inserting tr into table
          node_table.appendChild(node_tr);
          // label
          var node_tr = document.createElement("tr");
          var child_node = document.createElement("label");
          child_node.setAttribute("for", "fam_size");
          var text_node = document.createTextNode("Family size");
          child_node.appendChild(text_node);
          var node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // input
          child_node = document.createElement("input");
          child_node.setAttribute("type", "number");
          child_node.setAttribute("id", "fam_size");
          child_node.setAttribute("value", "5");
          node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // inserting tr into table
          node_table.appendChild(node_tr);
          // label
          var node_tr = document.createElement("tr");
          var child_node = document.createElement("label");
          child_node.setAttribute("for", "var_fam");
          var text_node = document.createTextNode("Variance in family size");
          child_node.appendChild(text_node);
          var node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // input
          child_node = document.createElement("input");
          child_node.setAttribute("type", "number");
          child_node.setAttribute("id", "var_fam");
          child_node.setAttribute("value", "1");
          node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          // inserting tr into table
          node_table.appendChild(node_tr);
          // append the child div to the parent div
          parent.appendChild(node_table);
        }
      }
      // global variable
      var count = 0;
      // fillRow() functions
      function fillRowDeaths() {
        var parent = document.getElementById("empty-deaths");
        while (parent.childElementCount) {
          parent.removeChild(parent.childNodes[0]);
        }
        var child_div = document.createElement("div");
        for (var i = 0; i <= count; i++) {
          var node = document.createElement("input");
          node.setAttribute("value", document.getElementById("range" + i).value);
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("name", "death");
          node.setAttribute("id", "death" + i);
          node.setAttribute("max", "1");
          node.setAttribute("min", "0");
          node.setAttribute("step", "0.001");
          switch (document.getElementById("range" + i).value) {
            case "18":
              node.setAttribute("value", "0.005");
              break;
            case "25":
              node.setAttribute("value", "0.010");
              break;
            case "60":
              node.setAttribute("value", "0.010");
              break;
            case "80":
              node.setAttribute("value", "0.040");
              break;
            case "150":
              node.setAttribute("value", "0.300");
              break;
          }
          child_div.appendChild(node);
          child_div.appendChild(document.createElement("br"));
          parent.appendChild(child_div);
        }
      }
      function fillRowIncub() {
        var parent = document.getElementById("empty-incubation");
        while (parent.childElementCount) {
          parent.removeChild(parent.childNodes[0]);
        }
        var child_div = document.createElement("div");
        for (var i = 0; i <= count; i++) {
          var node = document.createElement("input");
          node.setAttribute("value", document.getElementById("range" + i).value);
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("min", "1");
          node.setAttribute("name", "incub");
          node.setAttribute("id", "incub" + i);
          switch (document.getElementById("range" + i).value) {
            case "18":
              node.setAttribute("value", "6");
              break;
            case "25":
              node.setAttribute("value", "8");
              break;
            case "60":
              node.setAttribute("value", "5");
              break;
            case "80":
              node.setAttribute("value", "2");
              break;
            case "150":
              node.setAttribute("value", "2");
              break;
          }
          child_div.appendChild(node);
          child_div.appendChild(document.createElement("br"));
          parent.appendChild(child_div);
        }
      }
      function fillRowSev() {
        var parent = document.getElementById("empty-sev");
        while (parent.childElementCount) {
          parent.removeChild(parent.childNodes[0]);
        }
        var child_div = document.createElement("div");
        for (var i = 0; i <= count; i++) {
          var node = document.createElement("input");
          node.setAttribute("value", document.getElementById("range" + i).value);
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("name", "prob-sev-mild");
          node.setAttribute("id", "prob-sev-mild" + i);
          node.setAttribute("max", "1");
          node.setAttribute("min", "0");
          node.setAttribute("step", "0.01");
          switch (document.getElementById("range" + i).value) {
            case "18":
              node.setAttribute("value", "0.80");
              break;
            case "25":
              node.setAttribute("value", "0.95");
              break;
            case "60":
              node.setAttribute("value", "0.60");
              break;
            case "80":
              node.setAttribute("value", "0.40");
              break;
            case "150":
              node.setAttribute("value", "0.10");
              break;
          }
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("name", "prob-sev-med");
          node.setAttribute("id", "prob-sev-med" + i);
          node.setAttribute("max", "1");
          node.setAttribute("min", "0");
          node.setAttribute("step", "0.01");
          switch (document.getElementById("range" + i).value) {
            case "18":
              node.setAttribute("value", "0.16");
              break;
            case "25":
              node.setAttribute("value", "0.04");
              break;
            case "60":
              node.setAttribute("value", "0.30");
              break;
            case "80":
              node.setAttribute("value", "0.40");
              break;
            case "150":
              node.setAttribute("value", "0.40");
              break;
          }
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("name", "prob-sev-sev");
          node.setAttribute("id", "prob-sev-sev" + i);
          node.setAttribute("max", "1");
          node.setAttribute("min", "0");
          node.setAttribute("step", "0.01");
          switch (document.getElementById("range" + i).value) {
            case "18":
              node.setAttribute("value", "0.04");
              break;
            case "25":
              node.setAttribute("value", "0.01");
              break;
            case "60":
              node.setAttribute("value", "0.10");
              break;
            case "80":
              node.setAttribute("value", "0.20");
              break;
            case "150":
              node.setAttribute("value", "0.50");
              break;
          }
          child_div.appendChild(node);
          child_div.appendChild(document.createElement("br"));
          parent.appendChild(child_div);
        }
      }
      function fillRowWork() {
        var parent = document.getElementById("empty-age-work");
        while (parent.childElementCount) {
          parent.removeChild(parent.childNodes[0]);
        }
        var child_div = document.createElement("div");
        for (var i = 0; i <= count; i++) {
          var node = document.createElement("input");
          node.setAttribute("value", document.getElementById("range" + i).value);
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("name", "prob-age-work");
          node.setAttribute("id", "prob-age-work" + i);
          node.setAttribute("max", "1");
          node.setAttribute("min", "0");
          node.setAttribute("step", "0.1");
          child_div.appendChild(node);
          child_div.appendChild(document.createElement("br"));
          parent.appendChild(child_div);
        }
      }
      function fillRowComorb() {
        var parent = document.getElementById("empty-comorbid");
        while (parent.childElementCount) {
          parent.removeChild(parent.childNodes[0]);
        }
        var child_div = document.createElement("div");
        for (var i = 0; i <= count; i++) {
          var node = document.createElement("input");
          node.setAttribute("value", document.getElementById("range" + i).value);
          child_div.appendChild(node);
          node = document.createElement("input");
          node.setAttribute("type", "number");
          node.setAttribute("name", "prob-comorb");
          node.setAttribute("id", "prob-comorb" + i);
          node.setAttribute("max", "1");
          node.setAttribute("min", "0");
          node.setAttribute("step", "0.01");
          node.setAttribute("value", "0.00");
          child_div.appendChild(node);
          child_div.appendChild(document.createElement("br"));
          parent.appendChild(child_div);
        }
      }
      // addRow()
      /* <input type="number" name="range" id="range1">
<input onblur="findTotal('prob','warn')" type="number" name="prob" id="prob1" min="0" max="1" step="0.01"> */
      function addRow() {
        var parent = document.getElementById("pop-dist");
        //table
        var child_row = document.createElement("tr");
        var child_td = document.createElement("td");
        count++;
        var node = document.createElement("input");
        node.setAttribute("type", "number");
        node.setAttribute("name", "range");
        node.setAttribute("id", "range" + count);
        switch (count) {
          case 1:
            node.setAttribute("value", "25");
            break;
          case 2:
            node.setAttribute("value", "60");
            break;
          case 3:
            node.setAttribute("value", "80");
            break;
          case 4:
            node.setAttribute("value", "150");
            break;
        }
        child_td.appendChild(node);
        child_row.appendChild(child_td);
        node = document.createElement("input");
        node.setAttribute("onblur", "findTotal('prob','warn')");
        node.setAttribute("type", "number");
        node.setAttribute("name", "prob");
        node.setAttribute("id", "prob" + count);
        node.setAttribute("min", "0");
        node.setAttribute("max", "1");
        node.setAttribute("step", "0.001");
        switch (count) {
          case 1:
            node.setAttribute("value", "0.126");
            break;
          case 2:
            node.setAttribute("value", "0.346");
            break;
          case 3:
            node.setAttribute("value", "0.075");
            break;
          case 4:
            node.setAttribute("value", "0.080");
            break;
        }
        child_td = document.createElement("td");
        child_td.appendChild(node);
        child_row.appendChild(child_td);
        parent.appendChild(child_row);
        fillRowDeaths();
        fillRowIncub();
        fillRowSev();
        fillRowComorb();
      }
      var countSec = 0;
      function addRowSector() {
        var parent = document.getElementById("age-work");
        var child_div = document.createElement("div");
        countSec++;
        var node = document.createElement("input");
        node.setAttribute("type", "number");
        node.setAttribute("name", "range");
        node.setAttribute("id", "range" + countSec);
        switch (countSec) {
          case 1:
            node.setAttribute("value", "25");
            break;
          case 2:
            node.setAttribute("value", "60");
            break;
          case 3:
            node.setAttribute("value", "80");
            break;
          case 4:
            node.setAttribute("value", "150");
            break;
        }
        child_div.appendChild(node);
        node = document.createElement("input");
        // node.setAttribute("onblur", "findTotal('prob','warn')");
        node.setAttribute("type", "number");
        node.setAttribute("name", "prob");
        node.setAttribute("id", "prob" + countSec);
        node.setAttribute("min", "0");
        node.setAttribute("max", "1");
        node.setAttribute("step", "0.001");
        switch (countSec) {
          case 1:
            node.setAttribute("value", "0.126");
            break;
          case 2:
            node.setAttribute("value", "0.346");
            break;
          case 3:
            node.setAttribute("value", "0.075");
            break;
          case 4:
            node.setAttribute("value", "0.080");
            break;
        }
        child_div.appendChild(node);
        parent.appendChild(child_div);
      }
      function delRow(id) {
        var parent = document.getElementById(id);
        if (parent.childElementCount > 2) parent.removeChild(parent.lastElementChild);
        if (id == "age-work") countSec--;
        if (id == "pop-dist") count--;
      }
      // Expected ppl at a workplace
      function expPeople(id) {
        var isChecked = document.getElementById(id).checked;
        var parent = document.getElementById("empty-exp-workplace");
        var node_td;
        var node_tr = document.createElement("tr");
        node_tr.setAttribute("id", id + "_tr");
        if (isChecked) {
          var child_node = document.createElement("label");
          child_node.innerHTML = id;
          node_td = document.createElement("td");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          node_td = document.createElement("td");
          child_node = document.createElement("input");
          child_node.setAttribute("type", "number");
          child_node.setAttribute("min", "0");
          if (id == "Education") child_node.setAttribute("value", "100");
          if (id == "Office") child_node.setAttribute("value", "50");
          if (id == "Commercial") child_node.setAttribute("value", "10");
          node_td.appendChild(child_node);
          node_tr.appendChild(node_td);
          parent.appendChild(node_tr);
        }
        else {
          parent.removeChild(document.getElementById(id + "_tr"));
        }
      }
      var rowId;
      function addSectorCol(id) {
        var parent_label = document.getElementById("sector-label");
        //tr
        var isChecked = document.getElementById(id).checked;
        var child_label = document.createElement("label");
        var child_td = document.createElement("td");
        child_td.setAttribute("id", 'id + "-sector-label"');
        // Adding corresponding label
        if (isChecked) {
          child_label.innerHTML = id;
          child_td.appendChild(child_label);
          parent_label.appendChild(child_td);
        }
        else {
          parent_label.removeChild(document.getElementById('id + "-sector-label"'));
        }
        // Adding corresponding input fields
        for (rowId = 1; rowId <= 6; rowId++) {
          var parent_row = document.getElementById("row" + rowId);
          var node_td = document.createElement("td");
          node_td.setAttribute("id", "row" + rowId + id);
          if (isChecked) {
            var input = document.createElement("input");
            input.setAttribute("id", "row" + rowId + id + "input");
            input.setAttribute("min", "0");
            input.setAttribute("max", "1");
            input.setAttribute("step", "0.01");
            // Adding values
            switch (rowId) {
              case 1:
                if (id == "Education") input.setAttribute("value", "0.00");
                if (id == "Office") input.setAttribute("value", "0.00");
                if (id == "Commercial") input.setAttribute("value", "0.00");
                break;
              case 2:
                if (id == "Education") input.setAttribute("value", "0.99");
                if (id == "Office") input.setAttribute("value", "0.00");
                if (id == "Commercial") input.setAttribute("value", "0.00");
                break;
              case 3:
                if (id == "Education") input.setAttribute("value", "0.70");
                if (id == "Office") input.setAttribute("value", "0.07");
                if (id == "Commercial") input.setAttribute("value", "0.20");
                break;
              case 4:
                if (id == "Education") input.setAttribute("value", "0.10");
                if (id == "Office") input.setAttribute("value", "0.40");
                if (id == "Commercial") input.setAttribute("value", "0.35");
                break;
              case 5:
                if (id == "Education") input.setAttribute("value", "0.00");
                if (id == "Office") input.setAttribute("value", "0.10");
                if (id == "Commercial") input.setAttribute("value", "0.10");
                break;
              case 6:
                if (id == "Education") input.setAttribute("value", "0.00");
                if (id == "Office") input.setAttribute("value", "0.00");
                if (id == "Commercial") input.setAttribute("value", "0.00");
                break;
            }
            node_td.appendChild(input);
            parent_row.appendChild(node_td);
          }
          else {
            parent_row.removeChild(document.getElementById("row" + rowId + id));
          }
        }
        // // Remove all empty rows added by addEmptyRow()
        // while (rowId > 6) {
        //   var table = document.getElementById("sector-params");
        //   var rowCount = table.rows.length;
        //   table.deleteRow(rowCount - 1);
        //   rowId--;
        // }
      }
      // Add row in a table
      function addEmptyRow(id) {
        var parent = document.getElementById(id);
        //table
        // Add only a single row
        var child_row = document.createElement("tr");
        child_row.setAttribute("id", "row" + rowId);
        rowId++;
        for (var i = 0; i < 3; i++) {
          var child_td = document.createElement("td");
          var node = document.createElement("input");
          switch (i) {
            case 1:
              node.setAttribute("id", "unemp");
              break;
            case 2:
              node.setAttribute("id", "health");
              break;
          }
          child_td.appendChild(node);
          child_row.appendChild(child_td);
        }
        // Add extra data cells corresponding to edu, off, and comm
        var edu = document.getElementById("Education").checked;
        var off = document.getElementById("Office").checked;
        var comm = document.getElementById("Commercial").checked;
        var truCount = 0;
        if (edu) truCount++;
        if (off) truCount++;
        if (comm) truCount++;
        for (var i = 0; i < truCount; i++) {
          var child_td = document.createElement("td");
          var node = document.createElement("input");
          node.setAttribute("min", "0");
          node.setAttribute("max", "1");
          node.setAttribute("step", "0.01");
          child_td.appendChild(node);
          child_row.appendChild(child_td);
        }
        parent.appendChild(child_row);
        rowId++;
      }
      // Delete the last row
      function delLastRow(id) {
        var table = document.getElementById(id);
        var rowCount = table.rows.length;
        if (rowCount > 1) table.deleteRow(rowCount - 1);
      }
      var mybutton = document.getElementById("myBtn");
      // When the user scrolls down 20px from the top of the document, show the button
      // When the user clicks on the button, scroll to the top of the document
      function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      var modal = document.getElementById("myModal");
      // Get the button that opens the modal
      var btn = document.getElementById("btnx");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      // When the user clicks on the button, open the modal
      function btnrun() {
        ini_day = parseInt(document.getElementById("ini_day").value);
        fnl_day = parseInt(document.getElementById("fnl_day").value);
        if(document.getElementById("gra9").checked){
          document.getElementById("circle-1").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-1").style.display = "none";
        }
        if(document.getElementById("gra10").checked){
          document.getElementById("circle-2").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-2").style.display = "none";
        }
        if(document.getElementById("gra11").checked){
          document.getElementById("circle-4").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-4").style.display = "none";
        }
        if(document.getElementById("gra12").checked){
          document.getElementById("circle-3").style.display = "inline-block";
        }
        else{
          document.getElementById("circle-3").style.display = "none";
        }
        if(document.getElementById("gra1").checked){
          document.getElementById("graph-1-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-1-container").style.display = "none";
        }
        if(document.getElementById("gra2").checked){
          document.getElementById("graph-2-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-2-container").style.display = "none";
        }
        if(document.getElementById("gra3").checked){
          document.getElementById("graph-5-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-5-container").style.display = "none";
        }
        if(document.getElementById("gra4").checked){
          document.getElementById("graph-7-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-7-container").style.display = "none";
        }
        if(document.getElementById("gra5").checked){
          document.getElementById("graph-8-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-8-container").style.display = "none";
        }
        if(document.getElementById("gra6").checked){
          document.getElementById("graph-9-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-9-container").style.display = "none";
        }
        if(document.getElementById("gra7").checked){
          document.getElementById("graph-10-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-10-container").style.display = "none";
        }
        if(document.getElementById("gra8").checked){
          document.getElementById("graph-11-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-11-container").style.display = "none";
        }
        if(document.getElementById("gra13").checked){
          document.getElementById("graph-13-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-13-container").style.display = "none";
        }
        if(document.getElementById("gra14").checked){
          document.getElementById("graph-14-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-14-container").style.display = "none";
        }
        if(document.getElementById("gra15").checked){
          document.getElementById("graph-15-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-15-container").style.display = "none";
        }
        if(document.getElementById("gra16").checked){
          document.getElementById("graph-16-container").style.display = "inline-block";
        }
        else{
          document.getElementById("graph-16-container").style.display = "none";
        }
        modal.style.display = "none";
        document.getElementById("Process_0_0").click();
      }
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
      function openpop(){
        modal.style.display = "block";
      }
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

     $(document).on("contextmenu",function(e){

     if( e.button == 2 ) {
         e.preventDefault();
          callYourownFucntionOrCodeHere();
     }
	 return true;
	});
	
     function tab_create(){
     
     }

