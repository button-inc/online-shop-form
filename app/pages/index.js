import React from 'react';
import { Container, Icon, Header, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { SECONDARY_FONT_COLOUR, MIN_PADDING } from 'theme';
import InfoMessage from 'components/InfoMessage';
import Highlight from 'components/Highlight';
import ProgramSteps from 'components/landing/ProgramSteps';
import EligibilityCriteria from 'components/landing/EligibilityCriteria';
import Acknowledgement from 'components/landing/Acknowledgement';
import StyledUl from 'components/StyledUl';
import NavigationUl from 'components/NavigationUl';
import StyledP from 'components/StyledP';
import GeneralInformation from 'components/landing/GeneralInformation';
import Banner from 'components/landing/Banner';
import Header1 from 'components/Header1';
import Header2 from 'components/Header2';
import HrefLink from 'components/HrefLink';
import { TOP_HEIGHT } from 'layouts/DefaultLayout';
import SBCLogo from 'components/SBCLogo';
import DisabledBanner from 'components/DisabledBanner';

const Info = styled.div`
  color: ${SECONDARY_FONT_COLOUR};
  margin: ${MIN_PADDING} 0;
`;

const ScrollUp = styled.p`
  color: ${SECONDARY_FONT_COLOUR};
  font-weight: bold;
`;

const BackToTop = () => (
  <ScrollUp>
    <a href="#top">
      <Icon name="arrow circle up"></Icon>
      Back To Top
    </a>
  </ScrollUp>
);

const HorizontalRule = styled.hr`
  height: 1px;
  border: none;
  background-color: black;
  margin: 40px 0;
`;

const ScrollHeader1 = styled(Header1)`
  scroll-margin-top: ${TOP_HEIGHT};
  padding-top: 50px !important;
`;

const MaxWidthP = styled(StyledP)`
  max-width: 675px;
`;

const PaddedDiv = styled.div`
  padding: 0 30px 0 30px;
`;

export default function Home({ canSubmit = false } = {}) {
  return (
    <>
      <Container>
        {!canSubmit && <DisabledBanner />}
        <Banner />
        <PaddedDiv>
          <Header2>On this page:</Header2>
          <Grid columns={2} stackable>
            <Grid.Column>
              <NavigationUl>
                <li>
                  <a href="#program-explanation">How the program works</a>
                </li>
                <li>
                  <a href="#application-deadlines">Application deadlines</a>
                </li>
                <li>
                  <a href="#eligibility">Determine your eligibility</a>
                </li>
                <li>
                  <a href="#submit-application">Submit your application</a>
                </li>
                <li>
                  <HrefLink href="/files/program_guide.pdf" blank>
                    Program guide
                  </HrefLink>
                </li>
                <li>
                  <HrefLink href="/faq">Frequently asked questions</HrefLink>
                </li>
                <li>
                  <a href="#contact">Contact us</a>
                </li>
              </NavigationUl>
            </Grid.Column>
            <Grid.Column>
              <SBCLogo />
            </Grid.Column>
          </Grid>

          <ScrollHeader1 id="program-explanation">How the program works</ScrollHeader1>
          <MaxWidthP>
            The Launch Online Grant program provides funding to B.C.-based business to create an online shop or an
            online booking system and/or improve their existing online operations to attract new local customers and
            expand to new markets. The grant will pay for up to 75% of eligible expenses, up to a maximum of $7,500 per
            business.
          </MaxWidthP>
          <MaxWidthP>
            The program supports a rapid response for businesses and is accepting applications from businesses ready to
            start and finish their online shop within 12 weeks.
          </MaxWidthP>
          <StyledUl>
            <li>
              Up-to 30% of funds will be reserved for Black, Indigenous and people of color owned businesses and
              businesses operating outside of the lower mainland and greater Victoria.
            </li>
            <li>
              The funds must be used to hire B.C.-based company(ies) to do the online store or online booking system
              development.
            </li>
          </StyledUl>

          <ProgramSteps />
          <BackToTop />

          <ScrollHeader1 id="application-deadlines">Application deadlines</ScrollHeader1>
          <MaxWidthP>
            Program application intake is open until September 30, 2021 or until the funds have been fully subscribed.
            Funding will be awarded on a first-come first-serve basis to small- and medium-sized B.C. businesses.
          </MaxWidthP>
          <MaxWidthP>
            For the projects to have an immediate benefit, the funds will be given as soon as a business has been
            approved for the program.
          </MaxWidthP>
          <BackToTop />

          <ScrollHeader1 id="eligibility">Determine your eligibility</ScrollHeader1>
          <MaxWidthP>
            Review the following criteria to determine if your business, including sole proprietors and non-profits, is
            eligible for the program.
          </MaxWidthP>

          <EligibilityCriteria />
          <BackToTop />

          <ScrollHeader1 id="submit-application">Submit your application</ScrollHeader1>

          <Header2>Before applying</Header2>
          <InfoMessage>
            Businesses that applied previously but did not met the eligibility criteria will be reassessed against the
            new criteria. The applicant will be contacted if their application meets the new criteria. Your{' '}
            <Highlight>application does not need to be resubmitted,</Highlight> and you will not lose your place in the
            application queue due to reassessment.
          </InfoMessage>

          <MaxWidthP>
            Please review the eligibility information on this page. If you have any questions, please use the contact
            form at the bottom of this page for support before submitting your application. Incomplete applications
            cannot be approved to receive a grant.
          </MaxWidthP>

          <Header2>You will be asked to provide:</Header2>
          <StyledUl>
            <li>Current year or past fiscal year income statement</li>
            <li>Federal business number</li>
            <li>PST and WorkSafeBC registrations, if applicable</li>
            <li>Income tax return:</li>
            <StyledUl>
              <li>Notice of assessment (2019); or</li>
              <li>First section of T2 return or first section of owner’s tax return (form 5010-R) (2019 or 2020)</li>
            </StyledUl>
            <li>
              <HrefLink
                href="https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business/starting-a-restaurant-in-bc/register-your-business"
                blank
              >
                B.C. business registration number and official registered name
              </HrefLink>
            </li>
          </StyledUl>

          <InfoMessage
            text={`Note: All above mentioned documents must be provided to Alacrity Canada if application is
                    conditionally approved before funds can be disbursed.`}
          />

          <Header2>Receive funding to build your online store</Header2>
          <MaxWidthP>
            Successful applicants will receive funding within 2-3 weeks of approval and are required to develop or
            upgrade their online shop or online booking system within 12 weeks of receiving the grant.
          </MaxWidthP>

          <GeneralInformation canSubmit={canSubmit} />
          <BackToTop />

          <ScrollHeader1 id="contact">Contact Us</ScrollHeader1>
          <MaxWidthP>
            If you are a prior grant recipient and have questions about your grant or would like to request a call back
            from an agent, please email
            <br />
            <HrefLink href="mailto:applications@launchonline.ca">
              <Icon name="mail" />
              applications@launchonline.ca.
            </HrefLink>
          </MaxWidthP>
          <MaxWidthP>
            Please include your name, the name of your business, and your contact information. We will respond within 3
            business days.
          </MaxWidthP>
          <HorizontalRule />

          <Acknowledgement />
        </PaddedDiv>
      </Container>
    </>
  );
}

// export async function getServerSideProps({ req }) {
//   const { pgQuery, backendState } = req;

//   let canSubmit = backendState.canSubmit;

//   if (canSubmit) {
//     const count = await pgQuery.countApplication();
//     canSubmit = backendState.setApplicationCount(count);
//   }

//   return {
//     props: { canSubmit },
//   };
// }
