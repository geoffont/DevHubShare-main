import React from "react";
import PropTypes from "prop-types";
import { Link as MuiLink, Box, Stack, Typography, Grid } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function ResourceLink({ href, children }) {
  return (
    <MuiLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
      sx={{
        fontSize: 14,
        color: "#6366F1",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        "&:hover": { color: "#4F46E5" },
      }}
    >
      {children}
      <OpenInNewIcon sx={{ fontSize: 12 }} />
    </MuiLink>
  );
}

ResourceLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function ResourceCard({ title, links }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        p: 2.5,
        height: "100%",
      }}
    >
      <Typography
        sx={{ fontSize: 13, fontWeight: 700, color: "#0F172A", mb: 1.5 }}
      >
        {title}
      </Typography>
      <Stack spacing={0.75}>
        {links.map(({ href, label }) => (
          <ResourceLink key={label} href={href}>
            {label}
          </ResourceLink>
        ))}
      </Stack>
    </Box>
  );
}

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({ href: PropTypes.string, label: PropTypes.string })
  ).isRequired,
};

function Section({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#0F172A", mb: 2 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function ResourcesComponent() {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}
      >
        Ressources Web
      </Typography>
      <Typography sx={{ color: "#64748B", mb: 4 }}>
        Outils nécessaires à la conception de vos projets web
      </Typography>

      <Section title="Outils de développement">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ResourceCard
              title="Gestion de projet"
              links={[
                { href: "https://trello.com/", label: "Trello" },
                {
                  href: "https://www.atlassian.com/software/jira",
                  label: "Jira",
                },
                { href: "https://monday.com/", label: "Monday" },
                { href: "https://asana.com/", label: "Asana" },
                { href: "https://basecamp.com/", label: "Basecamp" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResourceCard
              title="Versionning"
              links={[
                { href: "https://github.com/", label: "GitHub" },
                { href: "https://about.gitlab.com/", label: "GitLab" },
                { href: "https://bitbucket.org/", label: "Bitbucket" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResourceCard
              title="Éditeurs de code"
              links={[
                {
                  href: "https://code.visualstudio.com/",
                  label: "Visual Studio Code",
                },
                { href: "https://notepad-plus-plus.org/", label: "Notepad++" },
                { href: "https://www.sublimetext.com/", label: "Sublime Text" },
                { href: "http://brackets.io/", label: "Brackets" },
                { href: "https://netbeans.apache.org/", label: "NetBeans" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResourceCard
              title="Wireframe"
              links={[
                { href: "https://wireframe.cc/", label: "Wireframe.cc" },
                { href: "https://balsamiq.com/wireframes/", label: "Balsamiq" },
                { href: "https://wireflow.co/", label: "Wireflow" },
                { href: "https://www.mockflow.com/", label: "MockFlow" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResourceCard
              title="Maquette"
              links={[
                { href: "https://www.adobe.com/", label: "Adobe XD" },
                { href: "https://www.justinmind.com/", label: "Justinmind" },
                { href: "https://moqups.com/", label: "Moqups" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ResourceCard
              title="SGBD"
              links={[
                { href: "https://www.mysql.com/fr/downloads/", label: "MySQL" },
                {
                  href: "https://www.microsoft.com/fr-fr/sql-server/sql-server-downloads",
                  label: "SQL Server",
                },
                {
                  href: "https://www.mongodb.com/try/download/community",
                  label: "MongoDB",
                },
                { href: "https://redis.io/download", label: "REDIS" },
                {
                  href: "https://cassandra.apache.org/_/download.html",
                  label: "Cassandra",
                },
              ]}
            />
          </Grid>
        </Grid>
      </Section>

      <Section title="Apprendre à coder">
        <Stack spacing={2}>
          {[
            {
              href: "https://www.data-transitionnumerique.com/programmation-informatique-guide-complet/",
              label: "Data Transition Numérique",
              desc: "Les bases de la programmation informatique — un guide complet pour débuter.",
            },
            {
              href: "https://www.javatpoint.com/",
              label: "javaTpoint",
              desc: "Tutoriels pour toutes les étapes de vos projets.",
            },
            {
              href: "https://www.codecademy.com/",
              label: "CodeAcademy",
              desc: "Plus de 45 millions de personnes ont appris à coder sur cette plateforme gratuite.",
            },
            {
              href: "https://www.w3schools.com/",
              label: "W3Schools",
              desc: "Tutoriels, exemples et exercices pour apprendre à coder dans de nombreux langages.",
            },
            {
              href: "https://www.edx.org/",
              label: "edX",
              desc: "Plus de 2000 cours en ligne issus de 140 institutions de premier plan.",
            },
            {
              href: "https://fr.khanacademy.org/",
              label: "Khan Academy",
              desc: "Plateforme d'enseignement gratuite créée en 2006, idéale pour débuter.",
            },
            {
              href: "https://www.udemy.com/",
              label: "Udemy",
              desc: "Nombreux cours de programmation gratuits et payants par vidéo.",
            },
            {
              href: "https://openclassrooms.com/fr/",
              label: "OpenClassrooms",
              desc: "Plus d'un million d'élèves, forums d'entraide, certifications reconnues.",
            },
          ].map(({ href, label, desc }) => (
            <Box
              key={label}
              sx={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 3,
                p: 2.5,
              }}
            >
              <ResourceLink href={href}>{label}</ResourceLink>
              <Typography sx={{ fontSize: 13, color: "#64748B", mt: 0.5 }}>
                {desc}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Section>
    </Box>
  );
}
