/* Replace only paths and metadata here as final assets become available.
   A clip with video: null renders its poster as a reviewable placeholder. */
window.CTP_CONTENT = {
  authors: [
    {name:"Xian Nie", affiliations:"1,2", symbol:"*"},
    {name:"Yujie Zang", affiliations:"1,2,3", symbol:"*"},
    {name:"Yuhang Zheng", affiliations:"3", symbol:"*"},
    {name:"Yupeng Zheng", affiliations:"4"},
    {name:"Songen Gu", affiliations:"5"},
    {name:"Wendi Chen", affiliations:"1"},
    {name:"Chuan Wen", affiliations:"1"},
    {name:"Cewu Lu", affiliations:"1"},
    {name:"Wenchao Ding", affiliations:"2"},
    {name:"Junchi Yan", affiliations:"1"},
    {name:"Shuicheng Yan", affiliations:"3"}
  ],
  affiliations: [
    "Shanghai Jiao Tong University",
    "TARS Robotics",
    "National University of Singapore",
    "Institute of Automation, Chinese Academy of Sciences",
    "Fudan University"
  ],
  authorNote: "* Equal contribution",
  links: {paper: "", code: "https://github.com/ctp-robotics/CTP", dataset: ""},
  bibtex: `@misc{nie2026contacttrajectoryprompting,
  title = {Contact Trajectory Prompting: In-Context Transfer of Contact-Rich Behaviors from a Single Demonstration},
  author = {Nie, Xian and Zang, Yujie and Zheng, Yuhang and Zheng, Yupeng and Gu, Songen and Chen, Wendi and Wen, Chuan and Lu, Cewu and Ding, Wenchao and Yan, Junchi and Yan, Shuicheng},
  year = {2026}
}`,
  tasks: [
    {id:"wiping", label:"Wiping", note:"Transfer wiping behavior to unseen objects and surfaces.", cases:[
      {label:"Small vase", reference:{video:"assets/videos/wiping-small-reference.mp4", poster:"assets/images/wiping-small-reference.webp"}, execution:{video:"assets/videos/wiping-small-execution.mp4", poster:"assets/images/wiping-small-execution.webp"}},
      {label:"Glass bottle", reference:{video:"assets/videos/wiping-glass-reference.mp4", poster:"assets/images/wiping-glass-reference.webp"}, execution:{video:"assets/videos/wiping-glass-execution.mp4", poster:"assets/images/wiping-glass-execution.webp"}},
      {label:"Whiteboard", reference:{video:"assets/videos/wiping-board-reference.mp4", poster:"assets/images/wiping-board-reference.webp"}, execution:{video:"assets/videos/wiping-board-execution.mp4", poster:"assets/images/wiping-board-execution.webp"}}
    ]},
    {id:"rotation", label:"Rotation", note:"Transfer the demonstrated cap-rotation behavior.", cases:[
      {label:"Bottle cap", reference:{video:"assets/videos/rotation-cap-reference.mp4", poster:"assets/images/rotation-cap-reference.webp"}, execution:{video:"assets/videos/rotation-cap-execution.mp4", poster:"assets/images/rotation-cap-execution.webp"}},
      {label:"Nut", reference:{video:"assets/videos/rotation-nut-reference.mp4", poster:"assets/images/rotation-nut-reference.webp"}, execution:{video:"assets/videos/rotation-nut-execution.mp4", poster:"assets/images/rotation-nut-execution.webp"}},
      {label:"Cube", reference:{video:"assets/videos/rotation-cube-reference.mp4", poster:"assets/images/rotation-cube-reference.webp"}, execution:{video:"assets/videos/rotation-cube-execution.mp4", poster:"assets/images/rotation-cube-execution.webp"}}
    ]},
    {id:"insertion", label:"Insertion", note:"Adapt insertion behavior to different connector geometries.", cases:[
      {label:"Round connector", reference:{video:"assets/videos/insertion-reference-1.mp4", poster:"assets/images/insertion-reference-1.webp"}, execution:{video:"assets/videos/insertion-round-execution.mp4", poster:"assets/images/insertion-round-execution.webp"}},
      {label:"U-shaped connector", reference:{video:"assets/videos/insertion-reference-2.mp4", poster:"assets/images/insertion-reference-2.webp"}, execution:{video:"assets/videos/insertion-u-execution.mp4", poster:"assets/images/insertion-u-execution.webp"}},
      {label:"Tube connector", reference:{video:"assets/videos/insertion-reference-3.mp4", poster:"assets/images/insertion-reference-3.webp"}, execution:{video:"assets/videos/insertion-tube-execution.mp4", poster:"assets/images/insertion-tube-execution.webp"}}
    ]}
  ],
  control: [
    {id:"force", title:"Wiping intensity", description:"Light and heavy references produce different wiping intensities on a new object.", rows:[
      {label:"Light", reference:{video:"assets/videos/force-light-reference.mp4", poster:"assets/images/force-light-reference.webp"}, execution:{video:"assets/videos/force-light-execution.mp4", poster:"assets/images/force-light-execution.webp"}},
      {label:"Heavy", reference:{video:"assets/videos/force-heavy-reference.mp4", poster:"assets/images/force-heavy-reference.webp"}, execution:{video:"assets/videos/force-heavy-execution.mp4", poster:"assets/images/force-heavy-execution.webp"}}
    ]},
    {id:"direction", title:"Rotation direction", description:"Changing the reference changes the rotation direction.", rows:[
      {label:"Clockwise", reference:{video:"assets/videos/direction-reference-1.mp4", poster:"assets/images/direction-reference-1.webp"}, execution:{video:"assets/videos/direction-clockwise-execution.mp4", poster:"assets/images/direction-clockwise-execution.webp"}},
      {label:"Counterclockwise", reference:{video:"assets/videos/direction-reference-2.mp4", poster:"assets/images/direction-reference-2.webp"}, execution:{video:"assets/videos/direction-counterclockwise-execution.mp4", poster:"assets/images/direction-counterclockwise-execution.webp"}}
    ]}
  ],
  baseline: {
    left:{video:"assets/videos/baseline-bpp-failure.mp4", poster:"assets/images/baseline-bpp-failure.webp"},
    right:{video:"assets/videos/wiping-small-execution.mp4", poster:"assets/images/wiping-small-execution.webp"}
  },
  toolExample:{video:"assets/videos/tool-eraser-example.mp4", poster:"assets/images/tool-eraser-example.webp"},
  tools: [
    {label:"Sponge", execution:{video:"assets/videos/tool-scouring-pad-execution.mp4", poster:"assets/images/tool-scouring-pad-execution.webp"}},
    {label:"Cloth", execution:{video:"assets/videos/tool-cloth-execution.mp4", poster:"assets/images/tool-cloth-execution.webp"}}
  ],
  fullProcess:{video:"assets/videos/full-process.mp4", poster:"assets/images/full-process.webp"}
};
