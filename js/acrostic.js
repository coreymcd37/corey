window.CM_ACROSTIC = [
  { name: "January", words: ["Jehovah", "Always", "Navigates", "Us", "Assisting", "Rebellious", "Youth"], ref: "Jeremiah 29:11", img: "img/months/01.webp", alt: "January: Journey Assists Newly Unfolding Ascends Restoration Yielding" },
  { name: "February", words: ["Fear", "Escapes", "Believers", "Resting", "Under", "Almighty\u2019s", "Righteous", "Yoke"], ref: "Isaiah 41:10 \u00b7 Matthew 11:28", img: "img/months/02.webp", alt: "February: Fear Escapes Believers Resting Under Almighty\u2019s Righteous Yoke. Isaiah 41:10, Matthew 11:28" },
  { name: "March", words: ["My", "Anchor", "Remains", "Christ", "Hallelujah"], ref: "Hebrews 6:19", img: "img/months/03.webp", alt: "March: My Anchor Remains Christ Hallelujah. Hebrews 6:19" },
  { name: "April", words: ["Always", "Patient", "Rich", "In", "Love"], ref: "Psalm 103:8", img: "img/months/04.webp", alt: "April: Always Patient Rich In Love. Psalm 103:8" },
  { name: "May", words: ["Mountains", "Are", "Yielding"], ref: "Mark 11:23" },
  { name: "June", words: ["Jesus", "Unlocks", "Nations\u2019", "Eternity"], ref: "John 3:16", img: "img/months/06.webp", alt: "June: Jesus Unlocks Nations\u2019 Eternity. John 3:16" },
  { name: "July", words: ["Jesus", "Unchanging", "Lord", "Yesterday"], ref: "Hebrews 13:8" },
  { name: "August", words: ["Always", "Under", "God\u2019s", "Unshakable", "Strength", "Trust"], ref: "Psalm 4:8", img: "img/months/08.webp", alt: "August: Always Under God\u2019s Unshakable Strength Trust. Psalm 4:8" },
  { name: "September", words: ["Surrender", "Every", "Problem", "To", "Emmanuel;", "My", "Burdens", "Ease", "Rest"], ref: "Matthew 11:28 \u00b7 1 Peter 5:7", img: "img/months/09.webp", alt: "September: Seeking Endurance Patience Trust Empathy Mindfulness Blessings Empowerment Rest" },
  { name: "October", words: ["Our", "Creator", "Transforms", "Ordeals", "Beautifully", "Everlastingly", "Restoring"], ref: "Romans 8:28", img: "img/months/10.webp", alt: "October: Our Creator Transforms Ordeals Beautifully Everlastingly Restoring. Romans 8:28" },
  { name: "November", words: ["Nations", "Offer", "Vibrant", "Everlasting", "Melodies", "Before", "Elohim", "Rejoicing"], ref: "Psalm 100", img: "img/months/11.webp", alt: "November: Nations Offer Vibrant Everlasting Melodies Before Elohim Rejoicing" },
  { name: "December", words: ["Descending", "Emmanuel", "Comes", "Embracing", "Mankind", "Bringing", "Eternal", "Redemption"], ref: "Isaiah 9:6 \u00b7 Luke 2", img: "img/months/12.webp", alt: "December: Descending Emmanuel Comes Embracing Mankind Before Elohim Rejoicing" }
];

window.CM_monthSet = function (date) {
  return window.CM_ACROSTIC[date.getMonth()];
};
