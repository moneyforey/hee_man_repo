    var numarr = [];
    var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
    nums2 = [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160],
    nums3 = [161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200];
    
        var i = nums.length,
        j = 0, count = 0;
        var ranNums = [];

        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            if(count<25)
            ranNums.push(nums[j]);
            
            count++;
            nums.splice(j,1);
        }

        count = 0;
        i = nums2.length;
        numarr = ranNums;
        ranNums = [];

        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            if(count<15)
            ranNums.push(nums2[j]);
            
            count++;
            nums2.splice(j,1);
        }

        numarr = [...numarr,...ranNums];
        i = nums3.length;
        count = 0;
        ranNums = [];
        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            if(count<10)
            ranNums.push(nums3[j]);
            
            count++;
            nums3.splice(j,1);
        }
        numarr = [...numarr,...ranNums];

    var data;
    var score = 0;

    function initQuiz(){
        fetch("https://tipsg.in/v4/quiz.json",{method:'GET'})
            .then(response => response.json())
            .then(result =>{
                data =result;
                loadQuiz();
            });
    }

    var qnum = 0;
     let que = document.getElementById('que');
     let opts = document.getElementsByClassName('opts');
     let qno = document.getElementById('qno');
     let checks = document.getElementsByName('radio');

     function subQ(){
            score = (data[numarr[qnum]]['ans'] == document.querySelector('input[name="radio"]:checked').id)? ++score : score;
		 if(qnum < 49){
			 ++qnum;
		 	loadQuiz();
		 }
		 else{
		 submitTestBtn.style.display = 'block';
		 nextQues.style.display = 'none';
		 }
            console.log('score: '+ score);
     }

      function loadQuiz(){
          let num = 1;
            que.innerText = 'Q.'+ (qnum+1) + ' '+ data[numarr[qnum]]['q'];
            qno.innerText = qnum+1 + '/50';
            Array.from(opts).forEach((element)=>{
                element.innerText = data[numarr[qnum]]['opt'][num];
                num++;
            })
            Array.from(checks).forEach((chk)=>{
                chk.checked = false;
            })
        }