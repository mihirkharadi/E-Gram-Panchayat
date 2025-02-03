import bcrypt from 'bcryptjs'

export const adminEmail="admin";
export const adminPassword=bcrypt.hashSync("admin124",10);
export const adminName="Kharadi Mihir";
export const role='admin';
export const staffEmail="staff";
export const staffPassword=bcrypt.hashSync('staff124',10);
export  const staffName="Kharadi Bittu";
export const staffRole='staff';