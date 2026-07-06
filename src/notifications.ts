export function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

// 🔔 Instant notification
export function sendNotification(title: string, body: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/pwa-192.png",
    });
  }
}

// 🔔 Daily reminder
export function runDailyReminder() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastNotifDate");

  if (last === today) return;

  setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("Project Cee 💙", {
        body: "How are you feeling today? Take a moment to check in with yourself.",
        icon: "/pwa-192.png",
      });

      localStorage.setItem("lastNotifDate", today);
    }
  }, 2000);
}