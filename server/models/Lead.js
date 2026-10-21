import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    service_interested: {
      type: String,
      default: 'General Inquiry',
    },
    budget: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      default: 'website-direct',
    },
    attribution: {
      page_url: String,
      utm_source: String,
      utm_medium: String,
      utm_campaign: String,
      utm_term: String,
      utm_content: String,
      ip: String,
      user_agent: String,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'quoted', 'won', 'lost'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.model('Lead', LeadSchema);
export default Lead;
