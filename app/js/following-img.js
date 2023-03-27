// Functional version
export default function followingImg(imgParentEl, ...args) {
	const IMGS = args;
	const PARENT_EL = imgParentEl;

	track();
	function track() {
		addEventListener("scroll", () => {
			if (
				(window.scrollY >= PARENT_EL.offsetTop) &
				(window.scrollY - PARENT_EL.offsetTop < PARENT_EL.offsetHeight / 3)
			)
				IMGS.map(el => (el.style.top = `${window.scrollY - PARENT_EL.offsetTop}px`));
		});
	}
}

// OOP version
// export default class FollowingImg {
// 	constructor(imgParentEl) {
// 		this.imgParentEl = imgParentEl;
// 	}

// 	track(...args) {
// 		console.log(args);

// 		addEventListener("scroll", () => {
// 			if (
// 				(window.scrollY >= this.imgParentEl.offsetTop) &
// 				(window.scrollY - this.imgParentEl.offsetTop < this.imgParentEl.offsetHeight / 2.2)
// 			)
// 				args.map(el => (el.style.top = `${window.scrollY - this.imgParentEl.offsetTop}px`));
// 		});
// 	}
// }
