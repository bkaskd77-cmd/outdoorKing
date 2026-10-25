"use client";

export function StaffSignOut() {
  async function signOut() {
    const { authClient } = await import("../../auth-client");
    await authClient.signOut();
    window.location.assign("/admin/login");
  }

  return (
    <button type="button" className="ok-staff-signout" onClick={() => void signOut()}>
      Sign out
    </button>
  );
}
