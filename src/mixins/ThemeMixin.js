export default {
    methods: {
        SetTheme(themeclass) {
            console.log("Setting ThemeClass to: " + themeclass);
            document.documentElement.className = themeclass;
            localStorage.setItem("theme", themeclass);
        }
    }
  };