export function isAuthorizedAdmin(pin?: string): pin is string {
  return Boolean(pin && pin === (process.env.ADMIN_PIN ?? "0000"));
}
