export default function ContactForm({ projectName }: { projectName?: string }) {
  return (
    <form className="flex flex-col gap-6">
      {projectName && (
        <input type="hidden" name="project" value={projectName} />
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xs tracking-jalour uppercase text-jalour-grey">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border border-white/20 bg-transparent px-4 py-3 text-sm text-jalour-white outline-none focus:border-jalour-blue"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs tracking-jalour uppercase text-jalour-grey">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-white/20 bg-transparent px-4 py-3 text-sm text-jalour-white outline-none focus:border-jalour-blue"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs tracking-jalour uppercase text-jalour-grey">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={
            projectName ? `I'm interested in ${projectName}. ` : undefined
          }
          className="border border-white/20 bg-transparent px-4 py-3 text-sm text-jalour-white outline-none focus:border-jalour-blue"
        />
      </div>
      <button
        type="submit"
        className="mt-2 self-start border border-jalour-blue bg-jalour-blue px-7 py-3 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-transparent hover:text-jalour-blue"
      >
        Send Message
      </button>
    </form>
  );
}
