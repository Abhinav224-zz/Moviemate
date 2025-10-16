# Web3Forms Setup Instructions

## How to Get Your Web3Forms Access Key

1. Go to https://web3forms.com
2. Click on "Get Started" or "Create Access Key"
3. Enter your email: **abhinavpurushothaman994@gmail.com**
4. Verify your email
5. Copy your Access Key

## How to Add the Access Key to Your Project

1. Open the file: `frontend/src/pages/Contact.jsx`
2. Find line 38 where it says: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
3. Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` with your actual access key from Web3Forms
4. Save the file

Example:
```javascript
access_key: 'abc123def-4567-89gh-ijkl-mnopqrstuvwx', // Your actual key
```

## What's Already Done

✅ Contact form integrated with Web3Forms API
✅ Messages will be sent to: abhinavpurushothaman994@gmail.com
✅ Form includes: name, email, subject, and message fields
✅ Success and error messages display
✅ Loading state while sending

## Testing

After adding your access key:
1. Go to your contact page
2. Fill out the form
3. Click "Send Message"
4. Check your email inbox for the message

**Note:** Web3Forms is free for up to 250 submissions per month.
