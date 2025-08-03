// Digital Content Page JavaScript

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-toggle').textContent = '+';
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                toggle.textContent = '-';
            }
        });
    });
});

// VOD Purchase Functions
function purchaseVOD(type) {
    const courses = {
        basic: '스피치 기초 완성 과정',
        presentation: '프레젠테이션 마스터 과정',
        interview: '면접 스피치 완벽대비 과정',
        vip: 'VIP 종합 패키지'
    };
    
    alert(`${courses[type]} 구매 기능이 곧 오픈됩니다. 현재는 전화상담을 이용해주세요.\n📞 02-1234-5678`);
}

// E-book Purchase Functions
function purchaseEbook(type) {
    const ebooks = {
        anxiety: '스피치 불안 제로 만들기',
        'first-impression': '첫인상 3초의 법칙',
        meeting: '회의에서 인정받는 발언법',
        bundle: '비법서 전집'
    };
    
    alert(`${ebooks[type]} 구매 기능이 곧 오픈됩니다. 현재는 전화상담을 이용해주세요.\n📞 02-1234-5678`);
}

// Subscription Service
function subscribeService() {
    alert('Grace Speech Premium 구독 서비스가 곧 오픈됩니다. 현재는 전화상담을 이용해주세요.\n📞 02-1234-5678');
}

// Free Download Form
document.addEventListener('DOMContentLoaded', function() {
    const freeDownloadForm = document.getElementById('freeDownloadForm');
    
    if (freeDownloadForm) {
        freeDownloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(freeDownloadForm);
            const name = formData.get('name') || freeDownloadForm.querySelector('input[type="text"]').value;
            const email = formData.get('email') || freeDownloadForm.querySelector('input[type="email"]').value;
            
            if (name && email) {
                alert(`${name}님, 이메일로 무료 가이드북을 발송했습니다!\n확인해주세요: ${email}`);
                freeDownloadForm.reset();
            }
        });
    }
});