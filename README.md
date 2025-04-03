# FMS Lore Quiz

A fun interactive quiz application to test knowledge about FMS lore and inside jokes. Pass the quiz to learn the ways of plox!

## Features

- Clean, modern design with a user-friendly interface
- Interactive quiz with multiple-choice questions about FMS lore
- Score tracking system
- High score leaderboard (saved locally)
- Responsive design for desktop and mobile
- Visual feedback for correct/incorrect answers

## How to Use

1. Open `index.html` in your web browser
2. Click "Start Quiz" to begin
3. Answer the questions by clicking on your choice
4. At the end, enter your name to save your score
5. View high scores by clicking the "High Scores" button

## Quiz Content

The quiz contains 10 questions about FMS lore, including:
- Famous personalities like Sidhang and his German Stare
- Inside jokes and catchphrases
- Memorable events and quotes
- Music and cultural references

## Technical Details

### Files

- `index.html` - The main HTML structure
- `styles.css` - Styling for the quiz
- `script.js` - Main JavaScript functionality
- `questions.js` - Contains all quiz questions

### Customization

You can customize the appearance by editing the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2a2a72;
    --secondary-color: #4776e6;
    --tertiary-color: #8e54e9;
    --background-color: #f8f9fa;
    --text-color: #333333;
    --accent-color: #ff7675;
    --error-color: #e74c3c;
    --success-color: #2ecc71;
    --card-bg: #ffffff;
    --border-color: #e0e0e0;
}
```

### Quiz Settings

You can adjust quiz settings by modifying these constants in `script.js`:

```javascript
const CORRECT_BONUS = 10; // Points awarded for each correct answer
const MAX_QUESTIONS = 10; // Number of questions per quiz
```

## Browser Compatibility

This quiz works best on modern browsers including:
- Chrome
- Firefox
- Edge
- Safari

## Credits

Created for FMS lore enthusiasts. May the ways of plox be with you! 