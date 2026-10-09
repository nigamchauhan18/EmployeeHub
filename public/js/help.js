let faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
        let currentItem = question.parentElement;
        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove('active');
                let answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            }
        });
        currentItem.classList.toggle('active');
        let answer = currentItem.querySelector('.faq-answer');
        if (currentItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = null;
        }
    });
});
