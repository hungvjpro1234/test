# 📄 SYSTEM TEST - RULE MANAGEMENT (Grouped by Type)

---

## 🧾 ABOUT

```md
Project name: Social Echo
Version: 1
Test environment: Windows 10, Edges browers , Chrome browers
Author: Minh Toan
Create Date: 27/4/2025
Preconditions: 
1. Run file admin on terminal
```

---

## 📊 SUMMARY

```md
Pass: 17
Fail: 2
Untested: 0
N/A: 0
Number of testcases: 19
```

---

# 🧩 UI TEST

| ID    | Type    | Feature                         | Test case description                                                                                                                           | Test data | Expected Result                                                                                                                                                                                                                                                           | Tester    | Date       | Result | Note |
| ----- | ------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- | ------ | ---- |
| RM_01 | UI Test | UI overall in device management | Going look the fonts, feature conforming UI design                                                                                              |           | 1. The labels, textbox and consistent font, sized font <br> 2. Button alignment matches the grid system <br> 3. Margin and paddings follow spacing scale <br> 4. Not having wrong in grammar and vocabulary <br> 5. Icons follow a consistent style                       | Minh Toan | 27-04-2025 | Pass   |      |
| RM_02 | UI Test | UI screen design                | 1. Check the title of screen in each part <br> 2. Check the focus of mouse <br> 3. Check the showed information in feature and button of screen |           | 1. Display the table of User Activity Logs <br> 2. Focust on button Clear Logs and Reload icon <br> 3. Display sufficient necessary information: Moderator of community on the right panel. These reported posts: name of person reported, time reported, reason: reports | Minh Toan | 27-04-2025 | Pass   |      |
| RM_03 | UI Test | UI with zooming in and out      | 1. Enter Ctrl + <br> 2. Enter Ctrl -                                                                                                            |           | 1. Display the consistency and non-overwhelmed in screen <br> 2. These button and features are not messy                                                                                                                                                                  | Minh Toan | 27-04-2025 | Pass   |      |
| RM_04 | UI Test | the responsive screen           | 1. Pull out <br> 2. Pull in                                                                                                                     |           | 1. Display the consistency and unoverwhelmed in screen <br> 2. These button and feature are not messy                                                                                                                                                                     | Minh Toan | 27-04-2025 | Pass   |      |

---

# ✅ VALIDATE

| ID    | Type     | Feature                                | Test case description                  | Test data | Expected Result                                | Tester    | Date       | Result | Note |
| ----- | -------- | -------------------------------------- | -------------------------------------- | --------- | ---------------------------------------------- | --------- | ---------- | ------ | ---- |
| RM_05 | Validate | Check the default rule for a community | Check the default rule for a community |           | Display rule and guidelines for this community | Minh Toan | 27-04-2025 | Pass   |      |

---

# ⚙️ FUNCTIONS

| ID    | Type      | Feature                                                                       | Test case description                                                                                                                             | Test data | Expected Result                                                                                                                                                     | Tester    | Date       | Result | Note |
| ----- | --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- | ------ | ---- |
| RM_06 | Functions | Check the panel of community                                                  | 1. Check the panel of community <br> 2. Name of community and photos <br> 3. Check the guidelines and informations                                |           | 1. Display information <br> 2. Displa name and photos of community <br> 3. Display the guideline of this community                                                  | Minh Toan | 27-04-2025 | Pass   |      |
| RM_07 | Functions | Check the function add rule on terminal                                       | 1. Run file on terminal <br> 2. Check the number : 3 add rule a community                                                                         |           | 1. Display on ternimal <br> 2. Add rule and display enter a community name                                                                                          | Minh Toan | 27-04-2025 | Pass   |      |
| RM_08 | Functions | Check add rule and enter one existed name community                           | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all Music                                |           | 1. Display all names of exist community <br> 2. Display all rule and ask are Are you sure you want to add these 10 rules to Music? (Y/N)                            | Minh Toan | 27-04-2025 | Pass   |      |
| RM_09 | Functions | Check add rule and enter one existed name community but it wrong grammar      | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all with wrong grammar healt and fitness |           | It announce Invalid community name. Please enter one of the following                                                                                               | Minh Toan | 27-04-2025 | Pass   |      |
| RM_10 | Functions | Check add rule and enter one non existed name community/words                 | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a non exist community hello                                        |           | It announce Invalid community name. Please enter one of the following                                                                                               | Minh Toan | 27-04-2025 | Pass   |      |
| RM_11 | Functions | Check add rule and enter a number/ sympol                                     | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a number or sympol 1,2                                             |           | It announce Invalid community name. Please enter one of the following                                                                                               | Minh Toan | 27-04-2025 | Pass   |      |
| RM_12 | Functions | Check add rule, enter correct community, enter Y/N to verify add rule         | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter Y/N                    | Y/N       | 1. Display "Done! Rules added successfully!". Then Press Enter to continue, or 'c' to exit... <br> 2. Display "Aborted!" Press Enter to continue, or 'c' to exit... | Minh Toan | 27-04-2025 | Pass   |      |
| RM_13 | Functions | Check add rule, enter correct community, enter y/n to verify add rule         | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter y/n                    | y/n       | 1. Display "Done! Rules added successfully!". Then Press Enter to continue, or 'c' to exit... <br> 2. Display "Aborted!" Press Enter to continue, or 'c' to exit... | Minh Toan | 27-04-2025 | Pass   |      |
| RM_14 | Functions | Check add rule, enter correct community, enter other words to verify add rule | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter a word h               | h         | It display "Invalid input. Please enter either Y or N"                                                                                                              | Minh Toan | 27-04-2025 | Pass   |      |
| RM_15 | Functions | Check add rule, enter correct community, enter other words to verify add rule | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter a number of sympol 1   | 1         | It display "Invalid input. Please enter either Y or N"                                                                                                              | Minh Toan | 27-04-2025 | Pass   |      |

---

# 🧠 BUSINESS OPERATION

| ID    | Type               | Feature                                                                           | Test case description                                                                                                                                    | Test data | Expected Result                                                                                                           | Tester    | Date       | Result | Note                                        |
| ----- | ------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- | ------ | ------------------------------------------- |
| RM_16 | Business operation | Flow of add rule successful                                                       | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter Y                             |           | Display "Done! Rules added successfully!". Then Press Enter to continue, or 'c' to exit...                                | Minh Toan | 27-04-2025 | Pass   |                                             |
| RM_17 | Business operation | Flow of add rule without verify                                                   | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter N                             |           | Display "Aborted!" Press Enter to continue, or 'c' to exit...                                                             | Minh Toan | 27-04-2025 | Pass   |                                             |
| RM_18 | Business operation | Flow of add rule with flow entering name community wrong after that enter correct | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter wrong name <br> 4. Enter correct name                                     |           | 1. It announce Invalid community name. Please enter one of the following <br> 2. Display list rule to add                 | Minh Toan | 27-04-2025 | Fail   | It is not working after enter correct name  |
| RM_19 | Business operation | Flow of add rule with flow entering wrong Y/N to verify. Then entering Y/N        | 1. Run file on terminal <br> 2. Enter: 3 to add rule a community <br> 3. Enter a existed name community/ all <br> 4. Enter wrong value <br> 5. Enter Y/N |           | 1. It display "Invalid input. Please enter either Y or N" <br> 2. Display "Done! Rules added successfully!" or "Aborted!" | Minh Toan | 27-04-2025 | Fail   | It is not working after enter correct value |

---

# 🐞 ISSUES

| ID    | Issue Description                                                                    |
| ----- | ------------------------------------------------------------------------------------ |
| RM_19 | It is not working after enter correct name and before that is entered a wrong name   |
| RM_18 | It is not working after enter correct value and before that is entered a wrong value |


