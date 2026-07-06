export function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

// 🔔 manual / instant reminder
export function sendNotification(title: string, body: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/vite.svg",
    });
  }
}

// 🔔 daily reminder (once per day)
export function runDailyReminder() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastNotifDate");

  if (last === today) return;

  setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("With Grace 💙", {
        body: "Daily check-in time. How are you feeling today?",
      });

      localStorage.setItem("lastNotifDate", today);
    }
  }, 2000);
}