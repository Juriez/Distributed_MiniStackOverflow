const express=require('express')
const router=express.Router()
const Notification=require('../models/Notification')
const authmiddleware=require('../middleware/authMiddleware')


router.post('/notify', async (req, res) => {
  try {
    const { email, postId, message, totalRecipients } = req.body;

    // Create and save the notification
    const notification = new Notification({
      email,
      postId,
      message,
      totalRecipients,
    });

    await notification.save();

    res.status(201).json({
      message: 'Notification created successfully.',
      notification,
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.get('/notification', authmiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      email: { $ne: req.user.email }, // Get notifications for other users' posts
      seenBy:{$ne:req.user.email},
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as viewed
router.put('/notification/:id/view', authmiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Update the notification's 'viewed' status and add the user to the 'seenBy' array
    
    if (!notification.seenBy.includes(req.user.email)) {
      notification.seenBy.push(req.user.email);
    }

    await notification.save();
    res.status(200).json({ message: 'Notification marked as viewed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router