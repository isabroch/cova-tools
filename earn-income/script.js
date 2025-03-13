const values = {
  dateStart: "",
  dateEnd: "",
  charName: "",
  skill: "",
  rpText: "",
  taskLevel: "",
  taskProf: "",
  dc: "",
  results: "",
  money: "",
  input: ""
};

const EARN_INCOME = [
  {
    level: 0,
    dc: 14,
    failed: 0.01,
    trained: 0.05,
    expert: 0.05,
    master: 0.05,
    legendary: 0.05,
  },
  {
    level: 1,
    dc: 15,
    failed: 0.02,
    trained: 0.2,
    expert: 0.2,
    master: 0.2,
    legendary: 0.2,
  },
  {
    level: 2,
    dc: 16,
    failed: 0.04,
    trained: 0.3,
    expert: 0.3,
    master: 0.3,
    legendary: 0.3,
  },
  {
    level: 3,
    dc: 18,
    failed: 0.08,
    trained: 0.5,
    expert: 0.5,
    master: 0.5,
    legendary: 0.5,
  },
  {
    level: 4,
    dc: 19,
    failed: 0.1,
    trained: 0.7,
    expert: 0.8,
    master: 0.8,
    legendary: 0.8,
  },
  {
    level: 5,
    dc: 20,
    failed: 0.2,
    trained: 0.9,
    expert: 1,
    master: 1,
    legendary: 1,
  },
  {
    level: 6,
    dc: 22,
    failed: 0.3,
    trained: 1.5,
    expert: 2,
    master: 2,
    legendary: 2,
  },
  {
    level: 7,
    dc: 23,
    failed: 0.4,
    trained: 2,
    expert: 2.5,
    master: 2.5,
    legendary: 2.5,
  },
  {
    level: 8,
    dc: 24,
    failed: 0.5,
    trained: 2.5,
    expert: 3,
    master: 3,
    legendary: 3,
  },
  {
    level: 9,
    dc: 26,
    failed: 0.6,
    trained: 3,
    expert: 4,
    master: 4,
    legendary: 4,
  },
  {
    level: 10,
    dc: 27,
    failed: 0.7,
    trained: 4,
    expert: 5,
    master: 6,
    legendary: 6,
  },
  {
    level: 11,
    dc: 28,
    failed: 0.8,
    trained: 5,
    expert: 6,
    master: 8,
    legendary: 8,
  },
  {
    level: 12,
    dc: 30,
    failed: 0.9,
    trained: 6,
    expert: 8,
    master: 10,
    legendary: 10,
  },
  {
    level: 13,
    dc: 31,
    failed: 1,
    trained: 7,
    expert: 10,
    master: 15,
    legendary: 15,
  },
  {
    level: 14,
    dc: 32,
    failed: 1.5,
    trained: 8,
    expert: 15,
    master: 20,
    legendary: 20,
  },
  {
    level: 15,
    dc: 34,
    failed: 2,
    trained: 10,
    expert: 20,
    master: 28,
    legendary: 28,
  },
  {
    level: 16,
    dc: 35,
    failed: 2.5,
    trained: 13,
    expert: 25,
    master: 36,
    legendary: 40,
  },
  {
    level: 17,
    dc: 36,
    failed: 3,
    trained: 15,
    expert: 30,
    master: 45,
    legendary: 55,
  },
  {
    level: 18,
    dc: 38,
    failed: 4,
    trained: 20,
    expert: 45,
    master: 70,
    legendary: 90,
  },
  {
    level: 19,
    dc: 39,
    failed: 6,
    trained: 30,
    expert: 60,
    master: 100,
    legendary: 130,
  },
  {
    level: 20,
    dc: 40,
    failed: 8,
    trained: 40,
    expert: 75,
    master: 150,
    legendary: 200,
  },
];

const datesInput = (() => {
  const elem = document.getElementById("dates");
  const rangepicker = new DateRangePicker(elem, {
    format: "dd MM",
    // maxNumberOfDates: 7,
    allowOneSidedRange: true,
  });
  return rangepicker;
})();

function updateOutput(input) {
  values[input.name] = input.value;

  if(input.name == "taskLevel" || input.name == "taskProf") {
    values.dc = EARN_INCOME[values.taskLevel].dc
  }

  if (input.name == "input" || input.name == "taskLevel" || input.name == "taskProf") {
    values.money = 0;
    values.results = "";

    const regex = /\d+$/gmi
    const matches = [...values.input.matchAll(regex)];
    matches.forEach( match => {
      const roll = parseInt(match);
      const result = (roll - values.dc);
      const resultText = result >= 10 ? "Crit Success" : result >= 0 ? "Success" : result >= -9 ? "Failure" : "Crit Failure";

      switch (resultText) {
        case "Crit Success":
          values.money += EARN_INCOME[+values.taskLevel + 1][values.taskProf];
          break;
        case "Success":
          values.money += EARN_INCOME[+values.taskLevel][values.taskProf];
          break;
        case "Failure":
          values.money += EARN_INCOME[+values.taskLevel].failed;
          break;
        case "Crit Failure":
          break;
      }

      values.money = Math.round(values.money * 100) / 100;

      values.results += `[${roll} ${resultText}] `
    })


  }

  const output = document.querySelector("#output");
  const template = `Date of Downtime(s): ${values.dateStart} - ${values.dateEnd}
Character Name: ${values.charName}
Skill Used: ${values.skill}
Roleplay Text: ${values.rpText}
Task Level Attempted: ${values.taskProf.charAt(0).toUpperCase()}${values.taskProf.slice(1)} ${values.taskLevel} - DC ${values.dc}
Result: ${values.results}
Money Earned: ${values.money}gp`;
  output.value = template;
}

document.querySelectorAll('input, textarea, select').forEach( el => {
  updateOutput(el);
  el.addEventListener("change", evt => updateOutput(evt.target));
  el.addEventListener("changeDate", evt => updateOutput(evt.target))
})