const showToaster = (msg) => {
	const toaster = document.getElementById('toaster')
	toaster.classList.remove('hidden')
	toaster.innerText = msg

	setTimeout(() => {
		toaster.classList.add('hidden')
	}, 5000);
};
