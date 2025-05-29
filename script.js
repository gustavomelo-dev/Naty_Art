// Mobile menu toggle
document.getElementById("mobile-menu-btn").addEventListener("click", () => {
	const mobileMenu = document.getElementById("mobile-menu");
	mobileMenu.classList.toggle("hidden");
});

// Page navigation
document.addEventListener("DOMContentLoaded", () => {
	const pageLinks = document.querySelectorAll(".page-link");
	const pages = document.querySelectorAll(".page-container");
	const navLinks = document.querySelectorAll(".nav-link");
	const specialPages = ["linktree"];

	for (const link of pageLinks) {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			const targetPage = this.getAttribute("data-page");

			for (const page of pages) {
				page.classList.remove("active", "fade-in");
			}

			for (const navLink of navLinks) {
				navLink.classList.remove("active");
			}

			for (const activeLink of document.querySelectorAll(
				`.nav-link[data-page="${targetPage}"]`,
			)) {
				activeLink.classList.add("active");
			}

			const targetElement = document.getElementById(targetPage);
			if (targetElement) {
				targetElement.classList.add("active", "fade-in");
			}

			document.getElementById("mobile-menu").classList.add("hidden");

			window.scrollTo(0, 0);
		});
	}

	// Gallery filters
	const filterButtons = document.querySelectorAll(".filter-btn");
	const galleryItems = document.querySelectorAll('[gallery="cards"]');

	for (const button of filterButtons) {
		button.addEventListener("click", function () {
			for (const btn of filterButtons) {
				btn.classList.remove("active");
			}
			this.classList.add("active");

			const filter = this.getAttribute("data-filter");

			for (const item of galleryItems) {
				if (filter === "all" || item.getAttribute("data-category") === filter) {
					item.classList.remove("hidden");
				} else {
					item.classList.add("hidden");
				}
			}
		});
	}

	const currentHash = window.location.hash.substring(1);
	if (
		currentHash &&
		(document.getElementById(currentHash) || specialPages.includes(currentHash))
	) {
		const pageLink = document.querySelector(
			`.page-link[data-page="${currentHash}"]`,
		);
		if (pageLink) pageLink.click();
	} else {
		document.querySelector('.page-link[data-page="home"]').click();
	}

	if (window.location.hash === "#linktree") {
		const linktreePage = document.getElementById("linktree");
		if (linktreePage) {
			for (const page of pages) {
				page.classList.remove("active");
			}
			linktreePage.classList.remove("hidden-page");
			linktreePage.classList.add("active");
		}
	}
});
// Modal
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("image-modal");
	const modalImg = document.getElementById("modal-img"); // ← ESSA AQUI!
	const modalTitle = document.getElementById("modal-title");
	const modalDesc = document.getElementById("modal-description");
	const modalFeedback = document.getElementById("modal-feedback");
	const modalFeedbackContainer = document.getElementById(
		"modal-feedback-container",
	);
	const modalContentColumn = document.getElementById("modal-content-column");
	const modalImageColumn = document.getElementById("modal-image-column");
	const modalClose = document.getElementById("modal-close");
	const body = document.body;

	const openModals = document.querySelectorAll("[data-open-modal='true']");

	for (const img of openModals) {
		img.addEventListener("click", () => {
			const title = img.getAttribute("data-title")?.trim();
			const description = img.getAttribute("data-description")?.trim();
			const feedback = img.getAttribute("data-feedback")?.trim();

			modalImg.src = img.src;

			modalTitle.textContent = title || "";
			modalDesc.textContent = description || "";
			modalFeedback.textContent = feedback || "";

			if (feedback) {
				modalFeedbackContainer.classList.remove("hidden");
			} else {
				modalFeedbackContainer.classList.add("hidden");
			}

			if (!title && !description && !feedback) {
				modalContentColumn.classList.add("hidden");
				modalImageColumn.classList.add("md:col-span-2");
			} else {
				modalContentColumn.classList.remove("hidden");
				modalImageColumn.classList.remove("md:col-span-2");
			}

			modal.classList.remove("hidden");
			setTimeout(() => {
				modal.classList.remove("opacity-0", "scale-95");
				modal.classList.add("opacity-100", "scale-100");
			}, 10);

			body.classList.add("overflow-hidden");
		});
	}

	const closeModal = () => {
		modal.classList.remove("opacity-100", "scale-100");
		modal.classList.add("opacity-0");
		setTimeout(() => {
			modal.classList.add("hidden");
			body.classList.remove("overflow-hidden");
		}, 300);
	};

	modalClose.addEventListener("click", closeModal);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeModal();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeModal();
	});
	window.addEventListener("popstate", closeModal);
});
