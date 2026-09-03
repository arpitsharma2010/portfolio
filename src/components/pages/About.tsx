import React from "react";
import PageSection from "../common/PageSection.tsx";

const About: React.FC = () => (
  <PageSection eyebrow="About" title="How I work">
    <div className="flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
      <p>
        Most of what I have shipped, I have owned rather than contributed to — the service, its
        design, and its releases. At Skopus AI that means a codebase I wrote almost all of; at DNB
        it meant being the engineer accountable for a microservice reaching production intact across
        four environments, and for diagnosing it when a release did not. That is the level I work at
        best.
      </p>
      <p>
        I read systems before I change them. The Sbanken service had no documentation and no
        original authors left, so the work started with tracing endpoints and downstream calls until
        the data flow was written down. The Tesserae fix that took an API response from ~50,000
        records to 50 came from the same place — the interesting question was not how to paginate,
        it was why an endpoint was returning a result set nobody rendered.
      </p>
      <p>
        My centre of gravity is backend and distributed systems: API design, service boundaries,
        concurrency, caching, and what happens when a downstream dependency is slow instead of
        down. I build the front end for the APIs I write when that is what the work needs, and I
        run my own infrastructure — ECS, S3, Terraform, CI/CD — because a service you cannot deploy
        is not finished. Taco-DB and the Pintos kernel are where I go to keep the layer underneath
        the framework from becoming a black box.
      </p>
      <p>
        I work AI-natively, both on AI and with it. Building an 8-endpoint RAG service taught me
        that the hard part is the boundary around the model — validating its output, routing intent,
        deciding what happens when it fails — not calling it. And I use Claude Code and Codex daily
        as tooling for exploration and refactoring, with review and tests still deciding what
        merges.
      </p>
    </div>
  </PageSection>
);

export default About;
