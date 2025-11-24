# Contact Us Message System - Testing Guide

## 📋 Overview
This guide provides comprehensive testing instructions for the new Contact Us message system.

## 🧪 API Testing

### 1. Create a Contact Message (Public)
**Endpoint:** `POST /api/contact-messages`

#### Request:
```bash
curl -X POST http://localhost:5000/api/contact-messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "Hello, I have a question about the village development project. Can you please provide more information about the upcoming infrastructure improvements?"
  }'
```

#### Expected Response (201):
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon.",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "Hello, I have a question about the village development project. Can you please provide more information about the upcoming infrastructure improvements?",
    "isRead": false,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
}
```

### 2. Get All Messages (Admin)
**Endpoint:** `GET /api/contact-messages`

#### Request:
```bash
curl -X GET http://localhost:5000/api/contact-messages \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

#### Expected Response (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "message": "Hello, I have a question about the village development project.",
      "isRead": false,
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "total": 1
}
```

### 3. Get Messages with Filters (Admin)
**Endpoint:** `GET /api/contact-messages?page=1&limit=5&status=pending&search=john`

#### Request:
```bash
curl -X GET "http://localhost:5000/api/contact-messages?page=1&limit=5&status=pending&search=john" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### 4. Get Message by ID (Admin)
**Endpoint:** `GET /api/contact-messages/:id`

#### Request:
```bash
curl -X GET http://localhost:5000/api/contact-messages/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### 5. Mark Message as Read (Admin)
**Endpoint:** `PATCH /api/contact-messages/:id/mark-read`

#### Request:
```bash
curl -X PATCH http://localhost:5000/api/contact-messages/64f8a1b2c3d4e5f6a7b8c9d0/mark-read \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### 6. Update Message with Reply (Admin)
**Endpoint:** `PUT /api/contact-messages/:id`

#### Request:
```bash
curl -X PUT http://localhost:5000/api/contact-messages/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "replied",
    "adminReply": "Thank you for your inquiry! The infrastructure improvements include road repairs, water supply upgrades, and new community center construction. We will share detailed plans soon."
  }'
```

### 7. Get Message Statistics (Admin)
**Endpoint:** `GET /api/contact-messages/stats`

#### Request:
```bash
curl -X GET http://localhost:5000/api/contact-messages/stats \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

#### Expected Response (200):
```json
{
  "success": true,
  "data": {
    "total": 25,
    "pending": 8,
    "replied": 15,
    "closed": 2,
    "unread": 5
  }
}
```

### 8. Delete Message (Admin)
**Endpoint:** `DELETE /api/contact-messages/:id`

#### Request:
```bash
curl -X DELETE http://localhost:5000/api/contact-messages/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## 🌐 Frontend Testing

### 1. Contact Form Page
- **URL:** `http://localhost:3000/contact-us`
- **Test Steps:**
  1. Navigate to the Contact Us page
  2. Verify form fields (Name, Email, Message)
  3. Test form validation:
     - Empty fields should show errors
     - Invalid email should show error
     - Message length validation
  4. Submit valid form data
  5. Verify success notification
  6. Verify form reset after submission

### 2. Admin Messages Page
- **URL:** `http://localhost:3000/admin/messages`
- **Requirements:** Must be logged in as admin
- **Test Steps:**
  1. Navigate to admin messages page
  2. Verify statistics cards display correctly
  3. Test search functionality
  4. Test status filters
  5. Test pagination
  6. Click "View" on a message to see details
  7. Test marking messages as read/unread
  8. Test sending replies
  9. Test changing message status
  10. Test deleting messages

### 3. Navigation Testing
- **Footer Navigation:**
  - Verify "Send Message" link in footer goes to `/contact-us`
  - Verify "Contact" link goes to existing `/contact` page

- **Admin Navigation:**
  - Verify "User Messages" appears in admin menu
  - Verify navigation to `/admin/messages`

## 🔍 Error Handling Tests

### 1. Validation Errors
- Test with missing required fields
- Test with invalid email format
- Test with message length exceeded

### 2. Authentication Errors
- Test admin endpoints without JWT token
- Test with invalid JWT token
- Test with expired JWT token

### 3. Not Found Errors
- Test GET/PATCH/PUT/DELETE with invalid message ID

## 📊 Performance Tests

### 1. Pagination Testing
- Test with large number of messages
- Verify pagination works correctly
- Check performance with page size variations

### 2. Search Performance
- Test search with various query strings
- Verify search works with name and email fields

## 🔐 Security Tests

### 1. Input Validation
- Test XSS attempts in message field
- Test SQL injection attempts
- Test email validation bypass attempts

### 2. Rate Limiting
- Test multiple rapid submissions
- Verify rate limiting works

## 📱 Browser Compatibility Testing

### Supported Browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Responsive Design:
- ✅ Mobile (320px - 767px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (1024px+)

## 🎯 Acceptance Criteria

### ✅ Functional Requirements:
- [x] Users can submit contact messages
- [x] Admin can view all messages
- [x] Admin can reply to messages
- [x] Admin can mark messages as read/unread
- [x] Admin can delete messages
- [x] Messages have status tracking
- [x] Search and filter functionality
- [x] Pagination support

### ✅ Non-Functional Requirements:
- [x] Responsive design
- [x] Form validation
- [x] Error handling
- [x] Security measures
- [x] Performance optimization
- [x] Browser compatibility

### ✅ Integration Requirements:
- [x] Existing authentication system
- [x] Database integration
- [x] API integration
- [x] Navigation integration

## 🚀 Deployment Checklist

### Backend:
- [x] ContactMessage model created
- [x] Controller functions implemented
- [x] Routes configured
- [x] Server updated with new routes

### Frontend:
- [x] ContactUs page created
- [x] AdminMessages page created
- [x] Routes configured in App.jsx
- [x] Navigation updated
- [x] Styling applied

### Database:
- [x] ContactMessage collection indexes
- [x] Validation rules
- [x] Default values configured

## 🐛 Common Issues & Solutions

### Issue: Messages not appearing in admin panel
**Solution:** Check that the server is running and routes are properly registered

### Issue: Form validation not working
**Solution:** Verify form validation logic and error state management

### Issue: Admin authentication errors
**Solution:** Ensure JWT token is properly stored and sent with requests

### Issue: Pagination not working
**Solution:** Check query parameter handling and API response format

---

## 📞 Support
If you encounter any issues during testing, please:
1. Check the console for error messages
2. Verify network requests in browser dev tools
3. Ensure all dependencies are properly installed
4. Check database connection status