//Required abilites of a calc
//accept user inputs of number, operator and another number
//should accept decimal numbers
//store inputs
//recognize inputs and perform calculations
//return a result from the operation


//Optional features: 
//should accept longer arithmetic operations...like multiple operations
//display all input as it is being entered

//store previous total as start of next operation

//clear button should clear all entries
//should prevent invalid input (operators next to each other, two decimal points)

const keys = document.querySelector('.calculator-buttons')
    keys.addEventListener('click', event => {
        const {target} = event; //this is for deconstructing the object pulling out the target object from the event object and making it available
        const {value}= target; //this is again deconstructing the object pulling out the value property from the target object and making it available for use for the rest of the code
        if(!target.matches('button')){
            return //the return here makes it so that the function exits when clicked anywhere else in the code that's not a button
        }else{
            //pass to parse method
            calculator.parseInput(value)
            console.log(`thing is ${event}`)
           
        }
    })

//things to add:'fix it to a class with a constructor inside of the class'-mayan: check repo for additional changes

const calculator = {
    displayText: '0' ,//shows up when you first open the calculator
    prevTotal : null,

    parseInput(val){
        
        //have any of the sp buttons have been clicked, like AC, decimal etc

        switch(val){
            case '=' :
                //calculate the answer
                this.calcAnswer(this.displayText)
                break
            case 'AC' :

                //clear the screen and stored values
                this.clearAll()
                break
            case '.':
                if(this.displayText == 0){
                    this.addText('0.')//pass '0.' into the text method
                }else{
                    this.addText(val) //add value to the text string
                }
                break
            default:
                this.addText(val)//add value to text string
                break

        }
    },

    addText(val){
        if(this.displayText === '0'){
            this.displayText = ''
        } else if(this.prevTotal !== null){
            this.displayText = this.prevTotal
            this.prevTotal = null //figure out how this works...like why prevTotal needs to be null
        }
        /*user entered an invalid sequence of chars*/ //check whether the last char in display AND the entered value are not numbers
        // if(this.displayText == NaN && val == NaN){
        if(isNaN(+(val)) && isNaN(+(this.displayText))){
            if(isNaN(this.displayText.slice(-1)))           //the whole two dots and 2.2.2. solve that...for suggestions watch 4:2 mayan calc stream
                return
        }
        this.displayText += val //output displays text to screen
        this.outputText(this.displayText)
    },

    outputText(text){
         document.querySelector('.calculator-screen').value = text
    },
    calcAnswer(eq){
        // console.log(eval(equation)) eval can be bad practice because malicious code can be passed in...so usually should be avoided
        //but here, eval here is limited to buttons
        console.log(eval(eq))
        let result = Function("return " + eq)() //figure out how does this works and whole conundrum between Function and eval wrt scope
        this.outputText(result)
    },
    clearAll(){
        this.displayText = '0',
        this.prevTotal = null,
        this.outputText(this.displayText)
    }

}