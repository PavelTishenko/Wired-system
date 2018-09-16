var scheme1 = {
  name: 'gate',
  type: 'xor',
  children: [
  {
      name: 'gate',
      type: 'and',
      children: [
      {
          name: 'switch',
          state: true
      },
      {
          name: 'switch',
          state: false
      }
      ]
  }, {
      name: 'gate',
      type: 'not',
      children: [
      {
          name: 'switch',
          state: true
      }
      ]
  }
  ]
},

scheme2 = {
  name: 'gate',
  type: 'and',
  children: [
  {
      name: 'gate',
      type: 'or',
      children: [
      {
          name: 'switch',
          state: true
      },
      {
          name: 'gate',
          type: 'xor',
          children: [
          {
              name: 'switch',
              state: false
          },
          {
              name: 'gate',
              type: 'not',
              children: [
              {
                  name: 'switch',
                  state: true
              }
              ]
          }
          ]
      }
      ]
  }, {
      name: 'gate',
      type: 'not',
      children: [
      {
          name: 'switch',
          state: true
      }
      ]
  }
  ]
},

scheme3 = {
  name: 'gate',
  type: 'xor',
  children: [
  {
      name: 'gate',
      type: 'not',
      children: [
      {
          name: 'switch',
          state: false
      }
      ]
  }, {
      name: 'gate',
      type: 'or',
      children: [
      {
          name: 'gate',
          type: 'or',
          children: [
          {
              name: 'switch',
              state: false
          },
          {
              name: 'gate',
              type: 'and',
              children: [
              {
                  name: 'switch',
                  state: false
              },
              {
                  name: 'switch',
                  state: true
              }
              ]
          }
          ]
      },
      {
          name: 'switch',
          state: false
      }
      ]
  }
  ]
};


function or(a,b) {
return a || b;
}
function and(a,b) {
return a && b;
}
function xor(a,b) {
return a ^ b;
}
function not(a) {
return !a;
}
/*=====================*/

var actions = {
or: function(a,b) {
  return a || b;
},
and: function(a,b) {
  return a && b;
},
xor: function(a,b) {
  return !!(a ^ b);
},
not: function(a) {
  return !a;
}
};

function actSomeActions(type){
    switch(type){
        case 'and': return actions.and;
            break;
        case 'not': return actions.not;
            break;
        case 'xor': return actions.xor;
            break;
        case 'or': return actions.or;
            break;
    }
}

function isLight(scheme){
    let valOfState;
    if(scheme.name === 'switch'){
        valOfState = scheme.state;
    }else{
        let act = actSomeActions(scheme.type);
        // console.log(scheme.children[0]);
        // console.log(scheme.children[1]);
        let a = isLight(scheme.children[0]);
        let b = scheme.children[1] ? isLight(scheme.children[1]) : null; //  if we have second val of children arr it's going to isLight else null
        valOfState = act(a, b);
    }
    return valOfState;
}

console.log("Is lamp on ? : " + isLight(scheme3));
