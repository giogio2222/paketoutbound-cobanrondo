document.addEventListener('DOMContentLoaded', function() {
    // 1. Floating Top Button Logic
    const topBtn = document.querySelector('.floating-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Automated TOC for Article Pages
    const tocContent = document.getElementById('toc-content');
    const articleBody = document.querySelector('.article-body');

    if (tocContent && articleBody) {
        const headers = articleBody.querySelectorAll('h2, h3');
        if (headers.length > 0) {
            const ul = document.createElement('ul');
            ul.className = 'list-unstyled ps-3';
            
            headers.forEach((header, index) => {
                const id = `header-${index}`;
                header.id = id;
                
                const li = document.createElement('li');
                li.className = header.tagName === 'H3' ? 'ms-3 my-2' : 'my-2 fw-bold';
                
                const a = document.createElement('a');
                a.href = `#${id}`;
                a.className = 'text-decoration-none text-dark';
                a.textContent = header.textContent;
                
                li.appendChild(a);
                ul.appendChild(li);
            });
            
            tocContent.appendChild(ul);
        } else {
            document.querySelector('.toc-card').style.display = 'none';
        }

        // TOC Toggle behavior (accordion-like as requested)
        const tocTitle = document.querySelector('.toc-title');
        tocTitle.addEventListener('click', () => {
            const content = document.getElementById('toc-content');
            if (content.style.display === "none") {
                content.style.display = "block";
                tocTitle.querySelector('i').classList.replace('bi-chevron-down', 'bi-chevron-up');
            } else {
                content.style.display = "none";
                tocTitle.querySelector('i').classList.replace('bi-chevron-up', 'bi-chevron-down');
            }
        });
    }

    // 3. Prevent Horizontal Overflow and Fix Navbar Mobiles
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarToggler && navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            document.body.style.overflow = 'hidden'; // Optional: keep scroll but restrict horizontal? 
            // In fact, the user says "tidak bisa digeser" so restricting scroll when open might be okay.
        });
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            document.body.style.overflow = '';
        });
    }
});
