
const submitButton = document.querySelector('[date-submit]');

submitButton.addEventListener("submit", createPromise);

function createPromise(e, position, delay) {
  e.preventDefault();
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve
      }
      reject
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });