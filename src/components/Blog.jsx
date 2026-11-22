import post1 from '../assets/site/blog/post-1.avif'
import post2 from '../assets/site/blog/post-2.avif'
import post3 from '../assets/site/blog/post-3.avif'
import { BLOG_POSTS } from '../content'
import { useModal } from '../context/ModalContext'

const posts = [
  { ...BLOG_POSTS[0], image: post1 },
  { ...BLOG_POSTS[1], image: post2 },
  { ...BLOG_POSTS[2], image: post3 },
]

export default function Blog() {
  const { openModal } = useModal()

  const handleOpenPost = (post) => {
    openModal('blog', post)
  }

  return (
    <section className="blog-section" id="blog">
      <header className="section-header">
        <h2>Blog</h2>
        <a
          href="#blog"
          onClick={(e) => {
            e.preventDefault()
            handleOpenPost(posts[0])
          }}
          role="button"
        >
          View all
        </a>
      </header>
      <div className="blog-grid">
        {posts.map((post) => (
          <article
            className="blog-card"
            key={post.title}
            onClick={() => handleOpenPost(post)}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            onKeyDown={(e) => e.key === 'Enter' && handleOpenPost(post)}
          >
            <img src={post.image} alt="" loading="lazy" decoding="async" />
            <p>{post.date}</p>
            <h3>{post.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
