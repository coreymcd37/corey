window.CM_ACROSTIC = [
  { name: "January", words: ["Jehovah", "Always", "Navigates", "Us", "Assisting", "Rebellious", "Youth"], ref: "Jeremiah 29:11" },
  { name: "February", words: ["Fear", "Escapes", "Believers", "Resting", "Under", "Almighty\u2019s", "Righteous", "Yoke"], ref: "Isaiah 41:10 \u00b7 Matthew 11:30" },
  { name: "March", words: ["My", "Anchor", "Remains", "Christ", "Hallelujah"], ref: "Hebrews 6:19" },
  { name: "April", words: ["Always", "Patient", "Rich", "In", "Love"], ref: "Psalm 103:8" },
  { name: "May", words: ["Mountains", "Are", "Yielding"], ref: "Mark 11:23" },
  { name: "June", words: ["Jesus", "Unlocks", "Nations\u2019", "Eternity"], ref: "John 3:16" },
  { name: "July", words: ["Jesus", "Unchanging", "Lord", "Yesterday"], ref: "Hebrews 13:8" },
  { name: "August", words: ["Always", "Under", "God\u2019s", "Unshakable", "Strength", "Trust"], ref: "Psalm 46" },
  { name: "September", words: ["Surrender", "Every", "Problem", "To", "Emmanuel;", "My", "Burdens", "Ease", "Rest"], ref: "Matthew 11:28 \u00b7 1 Peter 5:7" },
  { name: "October", words: ["Our", "Creator", "Transforms", "Ordeals", "Beautifully", "Everlastingly", "Restoring"], ref: "Romans 8:28" },
  { name: "November", words: ["Nations", "Offer", "Vibrant", "Everlasting", "Melodies", "Before", "Elohim", "Rejoicing"], ref: "Psalm 100" },
  { name: "December", words: ["Descending", "Emmanuel", "Comes", "Embracing", "Mankind", "Bringing", "Eternal", "Redemption"], ref: "Isaiah 9:6 \u00b7 Luke 2" }
];

window.CM_monthSet = function (date) {
  return window.CM_ACROSTIC[date.getMonth()];
};
