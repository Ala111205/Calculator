**🧮 Advanced Scientific Calculator (Web App)**

      A hard-level calculator web application built from scratch using HTML, CSS, and Vanilla JavaScript, featuring a custom mathematical expression engine (no eval), correct operator precedence, unary operator handling, memory functions, keyboard support, expression history restore with animations, and robust error handling.
      
      This project goes beyond basic calculators by implementing computer-science concepts such as tokenization, Reverse Polish Notation (RPN), stack-based evaluation, and a finite state machine for UI control.

**Repository / Live Demo👉** https://ala111205.github.io/Calculator/

**🚀 Features**

**🔹 Core Calculator Features**

      ➕➖✖️➗ Perform basic arithmetic operations (addition, subtraction, multiplication, division)

      📐 Correct operator precedence using RPN (Shunting-Yard style algorithm)

      🧠 Custom expression parser — no eval() used

      🔢 Supports decimal numbers and floating-point precision handling

      🔁 Unary operator support (e.g. -5, 3 * -2)

      📊 Square root calculations using function tokens (sqrt())

**🔹 Memory Operations**

      🧮 MC – Clear memory
      
      📥 MR – Recall memory value
      
      ➕ M+ – Add current number to memory
      
      ➖ M− – Subtract current number from memory
      
      ✔️ Memory operations are applied safely on evaluated numeric values (no string corruption or NaN issues)

**🔹 Input & Interaction**

      🖱️ Button-based input for numbers and operators
      
      ⌨️ Full keyboard support (digits, operators, Enter, Backspace)
      
      ⌫ Single-digit delete button with dynamic visibility
      
      🧾 Expression history display for previous calculations

**🔹 History Restore with Animation**

      📜 Click on the calculation history to restore the previous expression
      
      ✨ Smooth restore animation for visual feedback
      
      🎯 History interaction does not affect memory state

**🔹 Error Handling & Validation**

      🚫 Prevents invalid expressions such as:

          multiple consecutive operators (++, */)

          trailing operators (8+)

          unbalanced parentheses

      ⚠️ Handles division by zero gracefully
      
      ❌ Displays a clear Error state for invalid input

**🔹 Application State Management**

      🧠 Finite State Machine to manage calculator states:

          INPUT – user entering values

          RESULT – calculation completed

          ERROR – invalid expression or math error

      ✔️ Prevents incorrect behavior like appending values after results or errors

**🧠 Technical Highlights**

      ✔ Custom tokenizer for mathematical expressions
      
      ✔ Reverse Polish Notation (RPN) conversion
      
      ✔ Stack-based expression evaluation
      
      ✔ Unary operator (u-) handling
      
      ✔ Function tokens (sqrt) inside the parser
      
      ✔ Floating-point precision normalization
      
      ✔ Clean separation between UI logic and calculation engine

This project demonstrates real problem-solving and algorithmic thinking, not just DOM manipulation.

**⚙️ Tech Stack**

**🖥️ Frontend**

      HTML5 – semantic structure

      CSS3 – responsive layout, animations, UI styling

      JavaScript (ES6) – application logic, state management, custom math engine
