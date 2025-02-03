import bcrypt from 'bcryptjs'

export const adminEmail="admin@admin.com";
export const adminPassword=bcrypt.hash("admin124",10);
export const adminName="Kharadi Mihir";
export const role='admin';
export const staffEmail="staff@123";
export const staffPassword=bcrypt.hash('staff124',10);
export  const staffName="Kharadi Bittu";
export const staffRole='staff';