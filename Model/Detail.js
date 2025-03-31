const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  phoneNumber: {
    type: String,

  },
  email: {
    type: String,
    unique: true,
    default: 'no-email@example.com'
  },

  password: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // Profile Details
  phone: {
    type: String,
  },
  age: {
    type: String,
  },
  dob: {
    type: Date,
  },
  dateOfBirth: {
    type: String,
  },
  religion: {
    type: String,
  },
  motherTongue: {
    type: String,
  },
  caste: {
    type: String,
  },
  star: {
    type: String,
  },
  raasi: {
    type: String,
  },
  physicalStatus: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  familyStatus: {
    type: String,
  },
  familyType: {
    type: String,
  },
  father: {
    type: String, // "Yes" or "No"
  },
  mother: {
    type: String, // "Yes" or "No"
  },
  noOfBrothers: {
    type: String,
  },
  noOfSisters: {
    type: String,
  },
  highestEducation: {
    type: String,
  },
  employedIn: {
    type: String,
  },
  jobLocation: {
    type: String,
  },
  occupation: {
    type: String,
  },
  annualIncome: {
    type: String, // Store as string to allow flexibility with currency formatting
  },
  location: {
    type: String, // "Mangalore, Bangalore, Udupi" etc.
  },
  profileImage: {
    type: String, // Path or URL to the profile image
  },

  // Preferences (relation to Preferences schema)
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preferences",
  },

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notifications: [
    {
      type: { type: String, enum: ["followRequest"], default: "followRequest" },
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],

  // Friend Request Fields
  sentRequests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],
  receivedRequests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],
  acceptedFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  aboutMe: {
    type: String, // Text field for the user's self-description
  },
  hobbies: [
    {
      type: String, // Array of hobbies
    }
  ],
  additionalImages: [
    {
      type: String, // Array of image paths or URLs
    }
  ],

});




module.exports = mongoose.model("User", UserSchema);