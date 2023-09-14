import React from "react";
import { styled } from "@mui/system";
import {
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

const StyledLink = styled(Link)({
  textDecoration: "none",
  fontSize: 15,
  color: "#675C53",
  "&:hover": { color: "#82BE00" },
});

export default function ResourcesComponent() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mt: 3,
        minWidth: isMobile && "95vw",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{
          p: 2,
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#0088CE",
            fontWeight: "medium",
            textAlign: "center",
            mb: 4,
          }}
        >
          Ressources Web
        </Typography>

        <Typography variant="h6" textAlign="center" sx={{ color: "#333333" }}>
          Outils nécessaires à la conception de vos Projets Web
        </Typography>

        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems={isMobile ? "center" : "null"}
          justifyContent="center"
          spacing={isMobile ? 2 : 3}
          sx={{ width: "90%", p: 3 }}
        >
          <Stack
            direction="column"
            alignItems="center"
            minWidth={isMobile ? "100%" : "30%"}
            sx={{
              backgroundColor: "#FFFFFF",
              minHeight: "5rem",
              p: 0.5,
              borderRadius: 2,
              boxShadow: "2px 2px 15px 2px #D7D7D7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxHeight: 60,
                mb: 0.5,
                textAlign: "center",
                color: "#675C53",
                fontWeight: "bold",
              }}
            >
              Gestion de projet web
            </Typography>
            <Stack alignItems="center" justifyContent="flex-end">
              <StyledLink href="https://trello.com/" target="_blank">
                Trello
              </StyledLink>
              <StyledLink
                href="https://www.atlassian.com/software/jira"
                target="_blank"
              >
                Jira
              </StyledLink>
              <StyledLink href="https://monday.com/" target="_blank">
                Monday
              </StyledLink>
              <StyledLink href="https://asana.com/" target="_blank">
                Asana
              </StyledLink>
              <StyledLink href="https://basecamp.com/" target="_blank">
                Basecamp
              </StyledLink>
            </Stack>
          </Stack>

          <Stack
            direction="column"
            alignItems="center"
            minWidth={isMobile ? "100%" : "30%"}
            sx={{
              minHeight: "5rem",
              p: 0.5,
              borderRadius: 2,
              boxShadow: "2px 2px 15px 2px #D7D7D7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxHeight: 60,
                mb: 0.5,
                textAlign: "center",
                color: "#675C53",
                fontWeight: "bold",
              }}
            >
              Outils de versionning
            </Typography>
            <Stack alignItems="center">
              <StyledLink href="https://github.com/" target="_blank">
                GitHub
              </StyledLink>
              <StyledLink href="https://about.gitlab.com/" target="_blank">
                GitLab
              </StyledLink>
              <StyledLink href="https://bitbucket.org/" target="_blank">
                Bitbucket
              </StyledLink>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            minWidth={isMobile ? "100%" : "30%"}
            sx={{
              minHeight: "5rem",
              p: 0.5,
              borderRadius: 2,
              boxShadow: "2px 2px 15px 2px #D7D7D7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxHeight: 60,
                mb: 0.5,
                textAlign: "center",
                color: "#675C53",
                fontWeight: "bold",
              }}
            >
              Éditeurs de code
            </Typography>
            <Stack alignItems="center">
              <StyledLink href="https://code.visualstudio.com/" target="_blank">
                Visual Studio Code
              </StyledLink>
              <StyledLink href="https://notepad-plus-plus.org/" target="_blank">
                Notepad++
              </StyledLink>
              <StyledLink href="https://www.sublimetext.com/" target="_blank">
                Sublime Text
              </StyledLink>
              <StyledLink href="http://brackets.io/" target="_blank">
                Brackets
              </StyledLink>
              <StyledLink
                href="https://netbeans.apache.org/download/index.html"
                target="_blank"
              >
                NetBeans
              </StyledLink>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems={isMobile ? "center" : "null"}
          justifyContent="center"
          spacing={isMobile ? 2 : 3}
          sx={{ width: "90%", p: 3, mb: 4 }}
        >
          <Stack
            direction="column"
            alignItems="center"
            minWidth={isMobile ? "100%" : "30%"}
            sx={{
              minHeight: "5rem",
              p: 0.5,
              borderRadius: 2,
              boxShadow: "2px 2px 15px 2px #D7D7D7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxHeight: 60,
                mb: 0.5,
                textAlign: "center",
                color: "#675C53",
                fontWeight: "bold",
              }}
            >
              Outils pour Wireframe
            </Typography>
            <Stack alignItems="center" justifyContent="flex-end">
              <StyledLink
                href="https://wireframe.cc/?utm_source=bdmtools&utm_medium=siteweb&utm_campaign=wireframe-cc"
                target="_blank"
              >
                Wireframe.cc
              </StyledLink>
              <StyledLink
                href="https://balsamiq.com/wireframes/?utm_source=bdmtools&utm_medium=siteweb&utm_campaign=balsamiq"
                target="_blank"
              >
                Balsamiq
              </StyledLink>
              <StyledLink
                href="https://wireflow.co/?utm_source=bdmtools&utm_medium=siteweb&utm_campaign=wireflow"
                target="_blank"
              >
                Wireflow
              </StyledLink>
              <StyledLink
                href="https://www.mockflow.com/?utm_source=bdmtools&utm_medium=siteweb&utm_campaign=mockflow"
                target="_blank"
              >
                MockFlow
              </StyledLink>
            </Stack>
          </Stack>

          <Stack
            direction="column"
            alignItems="center"
            minWidth={isMobile ? "100%" : "30%"}
            sx={{
              minHeight: "5rem",
              p: 0.5,
              borderRadius: 2,
              boxShadow: "2px 2px 15px 2px #D7D7D7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxHeight: 60,
                mb: 0.5,
                textAlign: "center",
                color: "#675C53",
                fontWeight: "bold",
              }}
            >
              Outils pour Maquette
            </Typography>
            <Stack alignItems="center">
              <StyledLink href="https://www.adobe.com/" target="_blank">
                Adobe XD
              </StyledLink>
              <StyledLink href="https://www.justinmind.com/" target="_blank">
                Justinmind
              </StyledLink>
              <StyledLink href="https://bitbucket.org/" target="_blank">
                Bitbucket
              </StyledLink>
              <StyledLink href="https://moqups.com/" target="_blank">
                Moqups
              </StyledLink>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            minWidth={isMobile ? "100%" : "30%"}
            sx={{
              minHeight: "5rem",
              p: 0.5,
              borderRadius: 2,
              boxShadow: "2px 2px 15px 2px #D7D7D7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxHeight: 60,
                mb: 0.5,
                textAlign: "center",
                color: "#675C53",
                fontWeight: "bold",
              }}
            >
              SGBD (R)
            </Typography>
            <Stack alignItems="center">
              <StyledLink
                href="https://www.mysql.com/fr/downloads/"
                target="_blank"
              >
                MySQL (R)
              </StyledLink>
              <StyledLink
                href="https://www.microsoft.com/fr-fr/sql-server/sql-server-downloads"
                target="_blank"
              >
                Microsoft SQL Server (R)
              </StyledLink>
              <StyledLink
                href="https://www.mongodb.com/try/download/community"
                target="_blank"
              >
                MongoDB
              </StyledLink>
              <StyledLink href="https://redis.io/download" target="_blank">
                REDIS
              </StyledLink>
              <StyledLink
                href="https://cassandra.apache.org/_/download.html"
                target="_blank"
              >
                Cassandra
              </StyledLink>
            </Stack>
          </Stack>
        </Stack>

        <Typography variant="h6" textAlign="center" sx={{ color: "#333333" }}>
          Les bases de la programmation informatique
        </Typography>
        <Stack spacing={1} sx={{ alignSelf: "flex-start", p: 2 }}>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://www.data-transitionnumerique.com/programmation-informatique-guide-complet/"
            target="_blank"
          >
            Data Transition Numérique
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            La programmation informatique est devenue dans le numérique ce
            qu’était l’écriture à l’époque industrielle. Dans ce guide complet,
            vous apprenez les bases de la programmation informatique.
          </Typography>
        </Stack>
        <Typography variant="h6" textAlign="center" sx={{ color: "#333333" }}>
          Tutoriels pour la programmation
        </Typography>
        <Stack spacing={1} sx={{ alignSelf: "flex-start", p: 2 }}>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://www.javatpoint.com/"
            target="_blank"
          >
            javaTpoint
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            Retrouvez un ensemble de tutoriels pour toutes les étapes de vos
            projets.
          </Typography>
        </Stack>

        <Typography variant="h6" textAlign="center" sx={{ color: "#333333" }}>
          Sites Web pour apprendre à coder
        </Typography>
        <Stack spacing={1} sx={{ alignSelf: "flex-start", p: 2 }}>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://www.codecademy.com/"
            target="_blank"
          >
            CodeAcademy
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            Avec plus de 45 millions de gens ayant appris à coder sur ce site
            gratuit, CodeAcademy compte parmi les sites les plus populaires de
            cette liste. À la CodeAcademy, vous pouvez vous plonger dans
            l’apprentissage d’à peu près tout.
          </Typography>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://www.w3schools.com/"
            target="_blank"
          >
            W3schools
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            Le site, très bien doté, vous propose des tutoriels de
            programmation, diverses autres ressources ainsi que des exemples et
            des exercices pour vous aider à apprendre à coder. Commencez par
            choisir le langage de programmation de votre choix puis vous pouvez
            vous lancer directement dans le programme complet, ou choisir parmi
            différentes options d’apprentissage. Vous pouvez par exemple
            commencer par un petit quiz pour voir votre niveau actuel, valider
            ce que vous savez déjà et par où commencer. Vous pouvez directement
            vous lancer dans le programme et vous tester à l’aide de courts
            exemples et d’exercices de révision. Comme la CodeAcademy, W3Schools
            propose un large éventail de langages pour apprendre à programmer.
          </Typography>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://www.edx.org/"
            target="_blank"
          >
            edX
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            EdX est une autre plateforme d’apprentissage en ligne qui mérite
            qu’on s’y intéresse. Elle a été fondée par l’université de Harvard
            et le MIT en 2012 et comptait plus de 5 millions d’utilisateurs 3
            ans plus tard. Vous pouvez accéder à plus de 2000 cours en ligne
            gratuits, issus de 140 institutions de premier plan dans le monde
            entier. La plateforme utilise un logiciel open-source, et est à but
            non-lucratif. Au terme de la formation, vous pouvez valider
            l’acquisition de vos toutes nouvelles compétences par l’obtention
            d’un certificat de fin d’études.
          </Typography>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://fr.khanacademy.org/"
            target="_blank"
          >
            Khan Academy
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            Salman Khan a été l’un des premiers à créer une plateforme
            d’enseignement en ligne, entièrement gratuite. Créée en 2006, la
            plateforme vous apprend à aussi bien programmer des animations ou
            des jeux en Javascript et ProcessingJS, qu’à créer des pages web en
            HTML et CSS, grâce à des tutoriels vidéo. Conçu par Khan pour
            initier les étudiants à une heure d’informatique et de programmation
            informatique, le programme « Hour of code » peut même être destiné
            aux professeurs souhaitant projeter un cours en classe.
          </Typography>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://www.udemy.com/"
            target="_blank"
          >
            Udemy
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            Fondée en 2010, Udemy est une plateforme d’apprentissage en ligne
            qui peut être utilisée comme moyen d’améliorer ou d’acquérir de
            nouvelles compétences. Sur cette plateforme vous trouverez beaucoup
            de cours de programmation gratuits, qui sont enseignés par le biais
            de leçons vidéo. Udemy propose également des cours payants, dont les
            prix sont atténués par des coupons et des offres spéciales et
            parfois des versions gratuites de cours payants.
          </Typography>
          <StyledLink
            sx={{ fontSize: 20, fontWeight: 500, color: "#0088CE", mb: 1 }}
            href="https://openclassrooms.com/fr/"
            target="_blank"
          >
            Open ClassRooms
          </StyledLink>
          <Typography
            sx={{ fontSize: 15, color: "#333333", textAlign: "justify" }}
          >
            Open Classrooms compte plus d’un million d’élèves qui suivent des
            cours gratuitement. La plateforme francophone dispose en outre de
            forums afin de faciliter l’entraide. Cette plateforme propose
            ensuite des offres payantes : Pour 20€ par mois, vous pourrez suivre
            les cours à votre rythme en illimité et obtenir un certificat de
            réussite, reconnu par les employeurs. Pour 300€ par mois, vous vous
            dotez d’un mentor dédié, pour obtenir un diplôme et un emploi
            garanti. En fin de formation, les élèves reçoivent en effet une
            attestation de succès qu’ils pourront utiliser pour trouver un
            emploi de codeur.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
