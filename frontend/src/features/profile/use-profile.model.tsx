import { useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  role: string;
  joinDate: string;
  currency: string;
  language: 'pt-BR' | 'en-US';
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    monthlyReport: boolean;
  };
}

const MOCK_PROFILE: UserProfile = {
  id: '1',
  name: 'Kauã Morais',
  email: 'kaua@financy.app',
  avatarUrl: 'https://github.com/shadcn.png',
  phone: '(11) 99999-9999',
  role: 'Premium User',
  joinDate: 'Janeiro 2024',
  currency: 'BRL',
  language: 'pt-BR',
  theme: 'system',
  notifications: {
    email: true,
    push: false,
    monthlyReport: true,
  },
};

export function useProfileModel() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(MOCK_PROFILE);
      setEditedProfile(MOCK_PROFILE);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    setIsLoading(true);
    setTimeout(() => {
      setProfile(editedProfile);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: keyof UserProfile, value: UserProfile[keyof UserProfile]) => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    });
  };

  const handleNotificationChange = (key: keyof UserProfile['notifications']) => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      notifications: {
        ...editedProfile.notifications,
        [key]: !editedProfile.notifications[key],
      },
    });
  };

  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file);
  };

  return {
    profile: isEditing ? editedProfile : profile,
    originalProfile: profile,
    isLoading,
    isEditing,
    handleEditToggle,
    handleSave,
    handleInputChange,
    handleNotificationChange,
    handleAvatarChange,
  };
}
