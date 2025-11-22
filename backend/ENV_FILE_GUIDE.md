# .env File Configuration Guide

## Your Current .env File (Lines 1-2)

Your `.env` file should look like this:

```
EMAIL_USER=pm9581543@gmail.com
EMAIL_PASS=iervayfdigwvuybj
```

## Format Requirements

### Line 1: EMAIL_USER
- **Format:** `EMAIL_USER=your-email@gmail.com`
- **Your value:** `EMAIL_USER=pm9581543@gmail.com` ✅
- **No spaces** around the `=` sign
- **No quotes** around the email address

### Line 2: EMAIL_PASS
- **Format:** `EMAIL_PASS=your-16-character-app-password`
- **Your value:** `EMAIL_PASS=iervayfdigwvuybj` ✅
- **No spaces** around the `=` sign
- **No quotes** around the password
- Should be **16 characters** (Gmail app password)

### Optional Line 3: PORT
```
PORT=5000
```
(If not specified, defaults to 5000)

## Important Notes

1. **No spaces** before or after `=`
   - ✅ Correct: `EMAIL_USER=pm9581543@gmail.com`
   - ❌ Wrong: `EMAIL_USER = pm9581543@gmail.com`

2. **No quotes** around values
   - ✅ Correct: `EMAIL_USER=pm9581543@gmail.com`
   - ❌ Wrong: `EMAIL_USER="pm9581543@gmail.com"`

3. **File must be named exactly `.env`**
   - Not `.env.txt`
   - Not `env`
   - Just `.env` (no extension)

4. **File location:**
   - Must be in the `backend` folder
   - Same folder as `server.js`

## Troubleshooting

### If contact form still doesn't work:

1. **Check if backend server is running:**
   ```bash
   cd backend
   npm start
   ```
   Should see: `Server running on port 5000`

2. **Restart backend after changing .env:**
   - Stop server (Ctrl+C)
   - Start again: `npm start`

3. **Verify .env file is correct:**
   - Make sure no extra spaces
   - Make sure no quotes
   - Make sure file is in `backend` folder

4. **Check backend terminal for errors:**
   - When you submit form, check backend terminal
   - Look for error messages

## Your Current Setup

Based on your .env file:
- ✅ EMAIL_USER is set: `pm9581543@gmail.com`
- ✅ EMAIL_PASS is set: `iervayfdigwvuybj` (16 characters)

**If contact form still fails:**
1. Make sure backend server is running
2. Check backend terminal for specific error messages
3. Verify the app password is still valid (generate new one if needed)

