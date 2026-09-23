export type UserRole = 'client' | 'designer' | 'admin';

export interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  dateJoined: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface ClientUser extends BaseUser {
  role: 'client';
  companyName?: string;
  address: string;
  totalProjectsPosted: number;
  totalSpentKes: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  clientName?: string;
  completionDate: string;
}

export interface DesignerUser extends BaseUser {
  role: 'designer';
  skills: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  completedProjectsCount: number;
  hourlyRateKes: number;
  location: string;
  verified: boolean;
  portfolio: PortfolioItem[];
}

export interface AdminUser extends BaseUser {
  role: 'admin';
  adminLevel: 'super_admin' | 'moderator';
}

export type User = ClientUser | DesignerUser | AdminUser;

export type ProjectStatus = 'Pending' | 'Active' | 'Under Review' | 'Completed' | 'Disputed';

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  assignedDesignerId?: string;
  assignedDesignerName?: string;
  title: string;
  category: 'Brand Identity' | 'UI/UX Design' | 'Print & Publication' | 'Packaging Design' | 'Social Media Creatives' | 'Illustration & 3D';
  description: string;
  budgetKes: number;
  deadline: string;
  status: ProjectStatus;
  datePosted: string;
  deliverablesRequired: string[];
  deliverableSubmission?: {
    fileUrl: string;
    fileName: string;
    notes: string;
    submittedAt: string;
    status: 'pending_review' | 'approved' | 'revision_requested';
  };
}

export interface Bid {
  id: string;
  projectId: string;
  designerId: string;
  designerName: string;
  designerAvatar?: string;
  designerRating: number;
  designerSkills: string[];
  bidAmountKes: number;
  deliveryDays: number;
  bidMessage: string;
  bidDate: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface Payment {
  id: string;
  projectId: string;
  projectTitle: string;
  clientId: string;
  clientName: string;
  designerId: string;
  designerName: string;
  amountKes: number;
  paymentDate: string;
  paymentMethod: 'M-Pesa STK Push' | 'M-Pesa Paybill' | 'Card';
  paymentStatus: 'Completed' | 'Pending' | 'Failed';
  mpesaReceiptNumber: string;
  phoneNumber: string;
}

export interface Feedback {
  id: string;
  projectId: string;
  projectTitle: string;
  clientId: string;
  clientName: string;
  designerId: string;
  rating: number; // 1 - 5
  comment: string;
  feedbackDate: string;
}

export interface Message {
  id: string;
  projectId?: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  receiverRole: UserRole;
  content: string;
  dateSent: string;
  read: boolean;
}

export interface PlatformNotification {
  id: string;
  recipientId: string; // user id or 'all'
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'payment' | 'project' | 'bid';
  read: boolean;
}

export interface TestCaseResult {
  id: string;
  code: string;
  name: string;
  description: string;
  expectedResult: string;
  actualResult: string;
  status: 'Pass' | 'Fail' | 'Pending';
  lastRun?: string;
  details?: string;
}

export type NavigationTab = 'home' | 'marketplace' | 'dashboard' | 'messages' | 'documentation' | 'test_runner' | 'tech_stack' | 'how_it_works';
