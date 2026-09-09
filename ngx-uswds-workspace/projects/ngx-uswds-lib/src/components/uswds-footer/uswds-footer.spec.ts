import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UswdsFooter } from './uswds-footer';
import { UswdsButton } from '../uswds-button/uswds-button';
import { UswdsTextInput } from '../uswds-text-input/uswds-text-input';
import { FooterLinkColumn, FooterForm, FooterLink, FooterAgencyInfo } from './footer-types';
import { vi } from 'vitest';
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // compatibility for older code
      removeListener: vi.fn(), // compatibility for older code
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const SAMPLE_LINK_COLUMNS: FooterLinkColumn[] = [
  {
    topic: 'Topic1',
    links: [
      { label: 'Link1', href: '/Link1' },
      { label: 'Link2', href: '/Link2' },
    ],
  },
  {
    topic: 'Topic2',
    links: [
      { label: 'Link3', href: '/Link3' },
      { label: 'Link4', href: '/Link4' },
    ],
  },
  {
    topic: 'Topic3',
    links: [
      { label: 'Link5', href: '/Link5' },
      { label: 'Link6', href: '/Link6' },
    ],
  },
  {
    topic: 'Topic4',
    links: [
      { label: 'Link7', href: '/Link7' },
      { label: 'Link8', href: '/Link8' },
      { label: 'Longer name of a link', href: '/Link9' },
    ],
  },
];

const SAMPLE_FORM: FooterForm = {
  heading: 'form heading',
  label: 'form label',
  inputId: 'form-custom-id',
  inputWidth: 'lg',
  buttonStyle: 'AccentWarm',
  buttonText: 'form button',
  successMessage: 'Submitted!',
  errorMessage: 'Invalid email',
};

const SAMPLE_LINKS: FooterLink[] = [
  { label: 'Link1', href: '/Link1' },
  { label: 'Link2', href: '/Link2' },
  { label: 'Link3', href: '/Link3' },
  { label: 'Link4', href: '/Link4' },
];

const SAMPLE_AGENCY: FooterAgencyInfo = {
  name: 'agency name',
  logoImagePath: '/path',
  contactHeading: 'contact us',
  phone: '123-456-7899',
  email: 'info@agency.gov',
};

const SAMPLE_SOCIAL_LINKS = {
  facebook: '/facebook',
  twitter: '/twitter',
  youtube: '/youtube',
  instagram: '/instagram',
  rss: '/rss',
};

const SAMPLE_SOCIALS = [
  {
    name: 'Facebook',
    url: SAMPLE_SOCIAL_LINKS.facebook,
    iconPath: '/assets/img/usa-icons/facebook.svg',
  },
  {
    name: 'Twitter',
    url: SAMPLE_SOCIAL_LINKS.twitter,
    iconPath: '/assets/img/usa-icons/twitter.svg',
  },
  {
    name: 'YouTube',
    url: SAMPLE_SOCIAL_LINKS.youtube,
    iconPath: '/assets/img/usa-icons/youtube.svg',
  },
  {
    name: 'Instagram',
    url: SAMPLE_SOCIAL_LINKS.instagram,
    iconPath: '/assets/img/usa-icons/instagram.svg',
  },
  { name: 'RSS', url: SAMPLE_SOCIAL_LINKS.rss, iconPath: '/assets/img/usa-icons/rss_feed.svg' },
];

describe('UswdsFooter', () => {
  let component: UswdsFooter;
  let fixture: ComponentFixture<UswdsFooter>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsFooter);
    component = fixture.componentInstance;
    el = fixture.nativeElement;

    // Provide required prop
    fixture.componentRef.setInput('variant', 'medium');
    fixture.detectChanges();

    await fixture.whenStable();
  });

  describe('Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty primary links', () => {
      expect(component.links()).toEqual([]);
    });

    it('should have empty secondary links', () => {
      expect(component.linkColumns()).toEqual([]);
    });

    it('should have a return to top link', () => {
      const a = el.querySelector('div.usa-footer__return-to-top a');
      expect(a).toBeTruthy();
      expect(a!.getAttribute('href')).toBe('#');
      expect(a!.textContent).toBe('Return to top');
    });

    describe('Computed properties', () => {
      it('should use default icons path', () => {
        expect(component.iconsPath()).toBe('/assets/img/usa-icons');
      });

      it('should generate correct social media icon paths', () => {
        expect(component.facebookIconPath()).toBe(SAMPLE_SOCIALS[0].iconPath);
        expect(component.twitterIconPath()).toBe(SAMPLE_SOCIALS[1].iconPath);
        expect(component.youtubeIconPath()).toBe(SAMPLE_SOCIALS[2].iconPath);
        expect(component.instagramIconPath()).toBe(SAMPLE_SOCIALS[3].iconPath);
        expect(component.rssFeedIconPath()).toBe(SAMPLE_SOCIALS[4].iconPath);
      });
    });

    it('should throw an error for an invalid variant', () => {
      fixture.componentRef.setInput('variant', 'BADVARIANT');
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('Invalid footer variant selected, valid variants are: [big, medium, slim]');
    });
  });

  describe('Big footer', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'big');
      fixture.detectChanges();
    });

    it('should have the base footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer!.classList.contains('usa-footer')).toBeTruthy();
    });

    it('should have the big footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer!.classList.contains('usa-footer--big')).toBeTruthy();
    });

    describe('Primary section', () => {
      it('should render a nav element', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav).toBeTruthy();
      });

      it('should render nothing when links are empty', () => {
        fixture.componentRef.setInput('linkColumns', []);
        fixture.detectChanges();
        const links = el.querySelectorAll('li.usa-footer__secondary-link a');
        expect(links!.length).toBe(0);
      });

      describe('Link columns', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('linkColumns', SAMPLE_LINK_COLUMNS);
          fixture.detectChanges();
        });

        it('should render the correct number of columns', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          expect(cols.length).toBe(4);
        });

        it('should render the correct number of topics', () => {
          const topics = el.querySelectorAll('h4.usa-footer__primary-link');
          expect(topics.length).toBe(4);
        });

        it('should render the correct text of topics', () => {
          const topics = el.querySelectorAll('h4.usa-footer__primary-link');
          topics.forEach((topic, i) => {
            expect(topic.textContent).toBe(SAMPLE_LINK_COLUMNS[i].topic);
          });
        });

        it('should render the correct number of links for each column', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          cols.forEach((col, i) => {
            const links = col.querySelectorAll('li.usa-footer__secondary-link a');
            expect(links).toBeTruthy();
            expect(links.length).toBe(SAMPLE_LINK_COLUMNS[i].links.length);
          });
        });

        it('should render the correct label of links', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          cols.forEach((col, i) => {
            const links = col.querySelectorAll('li.usa-footer__secondary-link a');
            links.forEach((link, j) => {
              expect(link!.textContent).toBe(SAMPLE_LINK_COLUMNS[i].links[j].label);
            });
          });
        });

        it('should render the correct href of links', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          cols.forEach((col, i) => {
            const links = col.querySelectorAll('li.usa-footer__secondary-link a');
            links.forEach((link, j) => {
              expect(link!.getAttribute('href')).toBe(SAMPLE_LINK_COLUMNS[i].links[j].href);
            });
          });
        });
      });

      describe('Form', () => {
        it('should render the form', () => {
          const form = el.querySelector('form.usa-form');
          expect(form).toBeTruthy();
        });

        it('should render the heading', () => {
          const heading = el.querySelector('.usa-sign-up__heading');
          expect(heading).toBeTruthy();
        });

        it('should render the label', () => {
          const label = el.querySelector('form.usa-form label.usa-label');
          expect(label).toBeTruthy();
        });

        it('should render the input', () => {
          const input = el.querySelector('form.usa-form input[type="email"]');
          expect(input).toBeTruthy();
        });

        it('should render an empty span for screen reader success message', () => {
          const span = el.querySelector('form.usa-form span.usa-sr-only');
          expect(span).toBeTruthy();
          expect(span!.textContent).toBe('');
        });

        it('should render descriptive div for form feedback messages', () => {
          const div = el.querySelector('form.usa-form div#sign-up-input-desc-footer');
          expect(div).toBeTruthy();
        });

        it('should render the button', () => {
          const button = el.querySelector('form.usa-form button');
          expect(button).toBeTruthy();
        });

        it('should start at default state', () => {
          expect(component.formState()).toBe('default');
        });

        it('should start with no announcement', () => {
          expect(component.formAnnouncement()).toBe('');
        });

        it('should start with no errors', () => {
          expect(component.signUpForm.email().errors()).toEqual([]);
          expect(component.formErrors()).toEqual([]);
        });

        it('should start with no error styling', () => {
          expect(component.showError()).toBe(false);

          const div = el.querySelector('div#sign-up-container-error-footer');
          expect(div!.classList.length).toBe(0);
          expect(div!.classList.contains('usa-form-group--error')).toBe(false);

          const label = el.querySelector('label.usa-label');
          expect(label!.classList.length).toBe(1);
          expect(label!.classList.contains('usa-label--error')).toBe(false);
        });

        it('should reflect model values in the DOM and updates the model on user input', async () => {
          const input = el.querySelector('form.usa-form input[type="email"]') as HTMLInputElement;

          // Model-to-view
          component.signUpForm.email().value.set('model to view');
          await fixture.whenStable();
          expect(input.value).toBe('model to view');

          // View-to-model
          input.value = 'view to model';
          input.dispatchEvent(new Event('input'));
          await fixture.whenStable();
          expect(component.signUpForm.email().value()).toBe('view to model');
        });

        describe('Success state', () => {
          let button: HTMLButtonElement;

          beforeEach(async () => {
            component.signUpForm.email().value.set('test@example.com');
            await fixture.whenStable();
            button = el.querySelector('form.usa-form button') as HTMLButtonElement;
          });

          it('should mark email field as valid', () => {
            expect(component.signUpForm.email().valid()).toBeTruthy();
          });

          it('should set form state to success and reset form on submit', () => {
            button.click();
            fixture.detectChanges();
            expect(component.formState()).toBe('success');
            expect(component.signUpForm.email().value()).toBe('');
            expect(component.signUpForm.email().errors()).toEqual([]);
            expect(component.formErrors()).toEqual([]);
          });

          it('should emit the email', () => {
            const spy = vi.spyOn(component.formSubmit, 'emit');
            button.click();
            expect(spy).toHaveBeenCalledWith('test@example.com');
          });

          it('should render success message', () => {
            button.click();
            fixture.detectChanges();

            const span = el.querySelector('form.usa-form span.footer_form_success');
            expect(span).toBeTruthy();
            expect(span!.textContent).toBe("Sent! You're signed up for newsletters.");
          });

          it('should announce success message', () => {
            vi.useFakeTimers();
            button.click();
            fixture.detectChanges();
            vi.advanceTimersByTime(150);
            fixture.detectChanges();

            const span = el.querySelector('form.usa-form span.footer_form_success');
            expect(component.formAnnouncement()).toBe(span!.textContent);
            const srSpan = el.querySelector('form.usa-form span.usa-sr-only');
            expect(srSpan!.textContent).toBe("Sent! You're signed up for newsletters.");
            vi.useRealTimers();
          });

          it('should add the success state to text input', () => {
            button.click();
            fixture.detectChanges();

            const textInputComponent = fixture.debugElement.query(
              By.directive(UswdsTextInput),
            ).componentInstance;
            expect(textInputComponent.state()).toBe('success');
          });
        });

        describe('Error state', () => {
          describe('Invalid email', () => {
            beforeEach(async () => {
              component.signUpForm.email().value.set('BADEMAIL');
              await fixture.whenStable();
              const button: HTMLButtonElement = el.querySelector(
                'form.usa-form button',
              ) as HTMLButtonElement;
              button.click();
              fixture.detectChanges();
            });

            it('should mark email field as invalid', () => {
              expect(component.signUpForm.email().valid()).toBeFalsy();
            });

            it('should set form state to error and add errors on submit', () => {
              expect(component.formState()).toBe('error');
              expect(component.signUpForm.email().errors()).toEqual([
                expect.objectContaining({ kind: 'email' }),
              ]);
              expect(component.formErrors()).toEqual([expect.objectContaining({ kind: 'email' })]);
            });

            it('should move focus to the text input on submit', () => {
              const input = el.querySelector('form.usa-form input[type="email"]');
              expect(document.activeElement).toBe(input);
            });

            it('should render the correct error message', () => {
              const span = el.querySelector('span.usa-error-message');
              expect(span).toBeTruthy();
              expect(span!.textContent).toBe("Email address is missing an '@' sign.");
            });

            it('should add the error container class', () => {
              const div = el.querySelector('div#sign-up-container-error-footer');
              expect(div!.classList.contains('usa-form-group--error')).toBeTruthy();
            });

            it('should add the error label class', () => {
              const label = el.querySelector('label.usa-label');
              expect(label!.classList.contains('usa-label--error')).toBeTruthy();
            });

            it('should add the error state to text input', () => {
              const textInputComponent = fixture.debugElement.query(
                By.directive(UswdsTextInput),
              ).componentInstance;
              expect(textInputComponent.state()).toBe('error');
            });
          });

          describe('Empty email', () => {
            beforeEach(async () => {
              component.signUpForm.email().value.set('');
              await fixture.whenStable();
              const button: HTMLButtonElement = el.querySelector(
                'form.usa-form button',
              ) as HTMLButtonElement;
              button.click();
              fixture.detectChanges();
            });

            it('should set form state to error and add errors on submit', () => {
              expect(component.formState()).toBe('error');
              expect(component.formErrors()).toEqual([expect.objectContaining({ kind: 'empty' })]);
            });

            it('should move focus to the text input on submit', () => {
              const input = el.querySelector('form.usa-form input[type="email"]');
              expect(document.activeElement).toBe(input);
            });

            it('should render the correct error message', () => {
              const span = el.querySelector('span.usa-error-message');
              expect(span).toBeTruthy();
              expect(span!.textContent).toBe('Email field cannot be empty.');
            });

            it('should add the error container class', () => {
              const div = el.querySelector('div#sign-up-container-error-footer');
              expect(div!.classList.contains('usa-form-group--error')).toBeTruthy();
            });

            it('should add the error label class', () => {
              const label = el.querySelector('label.usa-label');
              expect(label!.classList.contains('usa-label--error')).toBeTruthy();
            });

            it('should add the error state to text input', () => {
              const textInputComponent = fixture.debugElement.query(
                By.directive(UswdsTextInput),
              ).componentInstance;
              expect(textInputComponent.state()).toBe('error');
            });
          });
        });

        describe('Custom values', () => {
          beforeEach(() => {
            fixture.componentRef.setInput('signUpFormInfo', SAMPLE_FORM);
            fixture.detectChanges();
          });

          it('should render custom heading', () => {
            const heading = el.querySelector('.usa-sign-up__heading');
            expect(heading!.textContent).toBe(SAMPLE_FORM.heading);
          });

          it('should render custom label', () => {
            const label = el.querySelector('form.usa-form label');
            expect(label!.textContent).toBe(SAMPLE_FORM.label);
          });

          it('should render custom button text', () => {
            const button = el.querySelector('form.usa-form button');
            expect(button!.textContent).toBe(SAMPLE_FORM.buttonText);
          });

          it('should use custom button style', () => {
            expect(component.signUpButtonStyle()).toBe(SAMPLE_FORM.buttonStyle);
            const buttonComponent = fixture.debugElement.query(
              By.directive(UswdsButton),
            ).componentInstance;
            expect(buttonComponent.buttonStyle()).toBe(SAMPLE_FORM.buttonStyle);
          });

          it('should use custom text input id', () => {
            expect(component.signUpInputId()).toBe(SAMPLE_FORM.inputId);
            const textInputComponent = fixture.debugElement.query(
              By.directive(UswdsTextInput),
            ).componentInstance;
            expect(textInputComponent.inputId()).toBe(SAMPLE_FORM.inputId);
          });

          it('should use custom text input width', () => {
            expect(component.signUpInputWidth()).toBe(SAMPLE_FORM.inputWidth);
            const textInputComponent = fixture.debugElement.query(
              By.directive(UswdsTextInput),
            ).componentInstance;
            expect(textInputComponent.width()).toBe(SAMPLE_FORM.inputWidth);
          });

          it('should use custom text input hint', () => {
            expect(component.signUpInputHint()).toBe(SAMPLE_FORM.inputHint);
            const textInputComponent = fixture.debugElement.query(
              By.directive(UswdsTextInput),
            ).componentInstance;
            expect(textInputComponent.hint()).toBe(SAMPLE_FORM.inputHint);
          });

          it('should use custom success message', async () => {
            component.signUpForm.email().value.set('test@example.com');
            await fixture.whenStable();
            const button: HTMLButtonElement = el.querySelector(
              'form.usa-form button',
            ) as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
            const span = el.querySelector('form.usa-form span.footer_form_success');
            expect(span).toBeTruthy();
            expect(span!.textContent).toBe(SAMPLE_FORM.successMessage);
          });

          it('should announce custom success message', () => {
            vi.useFakeTimers();
            component.signUpForm.email().value.set('test@example.com');
            const button: HTMLButtonElement = el.querySelector(
              'form.usa-form button',
            ) as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
            vi.advanceTimersByTime(150);
            fixture.detectChanges();

            const srSpan = el.querySelector('form.usa-form span.usa-sr-only');
            expect(component.formAnnouncement()).toBe(SAMPLE_FORM.successMessage);
            expect(srSpan!.textContent).toBe(SAMPLE_FORM.successMessage);
            vi.useRealTimers();
          });

          it('should use custom error message for invalid email', async () => {
            component.signUpForm.email().value.set('BADEMAIL');
            await fixture.whenStable();
            const button: HTMLButtonElement = el.querySelector(
              'form.usa-form button',
            ) as HTMLButtonElement;
            button.click();
            fixture.detectChanges();
            const span = el.querySelector('span.usa-error-message');
            expect(span).toBeTruthy();
            expect(span!.textContent).toBe(SAMPLE_FORM.errorMessage);
          });
        });

        describe('Fallback values', () => {
          it('should render default heading', () => {
            const heading = el.querySelector('.usa-sign-up__heading');
            expect(heading!.textContent).toBe('Sign up');
          });

          it('should render default label', () => {
            const label = el.querySelector('form.usa-form label');
            expect(label!.textContent).toBe('Your email address');
          });

          it('should use default input id', () => {
            expect(component.signUpInputId()).toBe('sign-up-input-footer');
            const input = el.querySelector('form.usa-form input[type="email"]');
            expect(input?.getAttribute('id')).toBe('sign-up-input-footer');
          });

          it('should render default button text', () => {
            const button = el.querySelector('form.usa-form button');
            expect(button!.textContent).toBe('Sign up');
          });

          it('should use default button style', () => {
            expect(component.signUpButtonStyle()).toBe('Default');
          });
        });
      });
    });

    describe('Accessibility', () => {
      it('should have an aria-label on nav', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav!.getAttribute('aria-label')).toBe('Footer navigation');
      });

      it('should link the label`s for attribute to the input`s id attribute', () => {
        const labelFor = el.querySelector('form.usa-form label.usa-label')?.getAttribute('for');
        const inputId = el.querySelector('form.usa-form input')?.getAttribute('id');
        expect(labelFor).toEqual(inputId);
      });

      it('should have the id of the error messages div in input`s aria-describedby', () => {
        const input = fixture.nativeElement.querySelector('form.usa-form input');
        expect(input.getAttribute('aria-describedby')).toContain('sign-up-input-desc-footer');
      });

      it('should have an autocomplete="email" on input', () => {
        const input = el.querySelector('input.usa-input');
        expect(input!.getAttribute('autocomplete')).toBe('email');
      });

      it('should have aria-live="polite" on screen reader span', () => {
        const span = el.querySelector('form.usa-form span.usa-sr-only');
        expect(span?.getAttribute('aria-live')).toBe('polite');
      });
    });
  });

  describe('Medium footer', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'medium');
      fixture.detectChanges();
    });

    it('should have only the base footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer!.classList.contains('usa-footer')).toBeTruthy();
      expect(footer!.classList.length).toBe(1);
    });

    describe('Primary section', () => {
      it('should render a nav element', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav).toBeTruthy();
      });

      it('should render nothing when links are empty', () => {
        fixture.componentRef.setInput('links', []);
        fixture.detectChanges();
        const links = el.querySelectorAll('a.usa-footer__primary-link');
        expect(links!.length).toBe(0);
      });

      describe('Links', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('links', SAMPLE_LINKS);
          fixture.detectChanges();
        });

        it('should render the correct number of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          expect(links.length).toBe(4);
        });

        it('should render the correct label of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          links.forEach((link, i) => {
            expect(link!.textContent).toBe(SAMPLE_LINKS[i].label);
          });
        });

        it('should render the correct href of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          links.forEach((link, i) => {
            expect(link!.getAttribute('href')).toBe(SAMPLE_LINKS[i].href);
          });
        });
      });
    });

    describe('Accessibility', () => {
      it('should have an aria-label on nav', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav!.getAttribute('aria-label')).toBe('Footer navigation');
      });
    });
  });

  describe('Big and medium variant`s secondary section', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'medium');
      fixture.detectChanges();
    });

    it('should not render agency name by default', () => {
      const name = el.querySelector('.usa-footer__logo-heading');
      expect(name).toBeNull();
    });

    it('should not render agency logo by default', () => {
      const logo = el.querySelector('img.usa-footer__logo-img');
      expect(logo).toBeNull();
    });

    it('should not render contact heading by default', () => {
      const heading = el.querySelector('.usa-footer__contact-heading');
      expect(heading).toBeNull();
    });

    it('should not render phone number by default', () => {
      const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
      expect(a).toBeNull();
    });

    it('should not render email by default', () => {
      const a = el.querySelector('address.usa-footer__address a[href^="mailto:"]');
      expect(a).toBeNull();
    });

    it('should not render social media icons and links by default', () => {
      SAMPLE_SOCIALS.forEach((social) => {
        const socialIcon = el.querySelector(`img.usa-social-link__icon[alt="${social.name}"]`);
        const parentLink = socialIcon?.parentElement;
        expect(socialIcon).toBeFalsy();
        expect(parentLink).toBeFalsy();
      });
    });

    describe('Agency informaton', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
        fixture.detectChanges();
      });

      it('should render agency name with the passed text', () => {
        const name = el.querySelector('.usa-footer__logo-heading');
        expect(name).toBeTruthy();
        expect(name!.textContent).toBe(SAMPLE_AGENCY.name);
      });

      it('should render agency logo with correct src', () => {
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo).toBeTruthy();
        expect(logo!.getAttribute('src')).toBe(SAMPLE_AGENCY.logoImagePath);
      });

      it('should render contact heading with the passed text', () => {
        const heading = el.querySelector('.usa-footer__contact-heading');
        expect(heading).toBeTruthy();
        expect(heading!.textContent).toBe(SAMPLE_AGENCY.contactHeading);
      });

      it('should render phone number with correct href', () => {
        const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
        expect(a).toBeTruthy();
        expect(a!.getAttribute('href')).toBe(`tel:${SAMPLE_AGENCY.phone}`);
      });

      it('should use phone number as label by default', () => {
        const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
        expect(a!.textContent).toBe(SAMPLE_AGENCY.phone);
      });

      it('should use phone number label as label when provided', () => {
        const SAMPLE_PHONE_LABEL: FooterAgencyInfo = {
          phone: '123-456-789',
          phoneLabel: '<(800) 555-GOVT>',
        };
        fixture.componentRef.setInput('agencyInfo', SAMPLE_PHONE_LABEL);
        fixture.detectChanges();
        const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
        expect(a!.textContent).toBe('<(800) 555-GOVT>');
      });

      it('should render email with correct href', () => {
        const a = el.querySelector('address.usa-footer__address a[href^="mailto:"]');
        expect(a).toBeTruthy();
        expect(a!.getAttribute('href')).toBe(`mailto:${SAMPLE_AGENCY.email}`);
      });
    });

    describe('Social media links', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('socials', SAMPLE_SOCIAL_LINKS);
        fixture.detectChanges();
      });

      it('should render social media icons', () => {
        SAMPLE_SOCIALS.forEach((social, i) => {
          const icons = el.querySelectorAll('img.usa-social-link__icon');
          expect(icons[i]).toBeTruthy();
          expect(icons[i]!.classList.contains('usa-social-link__icon')).toBeTruthy();
          expect(icons[i].getAttribute('src')).toBe(social.iconPath);
        });
      });

      it('should render social media links', () => {
        SAMPLE_SOCIALS.forEach((social, i) => {
          const icons = el.querySelectorAll('img.usa-social-link__icon');
          const parentLink = icons[i]?.parentElement;
          expect(parentLink).toBeTruthy();
          expect(parentLink!.classList.contains('usa-social-link')).toBeTruthy();
          expect(parentLink!.getAttribute('href')).toBe(social.url);
        });
      });

      it('should use custom icons path', () => {
        fixture.componentRef.setInput('iconsPath', '/custom/path');
        fixture.detectChanges();
        expect(component.facebookIconPath()).toBe('/custom/path/facebook.svg');
        expect(component.twitterIconPath()).toBe('/custom/path/twitter.svg');
        expect(component.youtubeIconPath()).toBe('/custom/path/youtube.svg');
        expect(component.instagramIconPath()).toBe('/custom/path/instagram.svg');
        expect(component.rssFeedIconPath()).toBe('/custom/path/rss_feed.svg');
      });
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('socials', SAMPLE_SOCIAL_LINKS);
        fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
        fixture.detectChanges();
      });

      it('should have alt text for social media icons', () => {
        SAMPLE_SOCIALS.forEach((social, i) => {
          const icons = el.querySelectorAll('img.usa-social-link__icon');
          expect(icons[i].getAttribute('alt')).toBe(social.name);
        });
      });

      it('should have an empty alt for the logo by default', () => {
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo!.getAttribute('alt')).toBe('');
      });

      it('should use alt for the logo when provided', () => {
        const SAMPLE_ALT: FooterAgencyInfo = {
          logoImagePath: '/path',
          logoAlt: 'logo alternative text',
        };
        fixture.componentRef.setInput('agencyInfo', SAMPLE_ALT);
        fixture.detectChanges();
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo!.getAttribute('alt')).toBe('logo alternative text');
      });
    });
  });

  describe('Slim footer', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'slim');
      fixture.detectChanges();
    });

    it('should have the base footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer!.classList.contains('usa-footer')).toBeTruthy();
    });

    it('should have the slim footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer!.classList.contains('usa-footer--slim')).toBeTruthy();
    });

    describe('Primary section', () => {
      it('should render a nav element', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav).toBeTruthy();
      });

      it('should render nothing when links are empty', () => {
        fixture.componentRef.setInput('links', []);
        fixture.detectChanges();
        const links = el.querySelectorAll('a.usa-footer__primary-link');
        expect(links!.length).toBe(0);
      });

      it('should not render phone number by default', () => {
        const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
        expect(a).toBeNull();
      });

      it('should not render email by default', () => {
        const a = el.querySelector('address.usa-footer__address a[href^="mailto:"]');
        expect(a).toBeNull();
      });

      describe('Links', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('links', SAMPLE_LINKS);
          fixture.detectChanges();
        });

        it('should render the correct number of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          expect(links.length).toBe(4);
        });

        it('should render the correct label of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          links.forEach((link, i) => {
            expect(link!.textContent).toBe(SAMPLE_LINKS[i].label);
          });
        });

        it('should render the correct href of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          links.forEach((link, i) => {
            expect(link!.getAttribute('href')).toBe(SAMPLE_LINKS[i].href);
          });
        });
      });

      describe('Agency Information', () => {
        it('should render phone number with correct href', () => {
          fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
          fixture.detectChanges();
          const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
          expect(a).toBeTruthy();
          expect(a!.getAttribute('href')).toBe(`tel:${SAMPLE_AGENCY.phone}`);
        });

        it('should use phone number as label by default', () => {
          fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
          fixture.detectChanges();
          const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
          expect(a!.textContent).toBe(SAMPLE_AGENCY.phone);
        });

        it('should use phone number label as label when provided', () => {
          const SAMPLE_PHONE_LABEL: FooterAgencyInfo = {
            phone: '123-456-789',
            phoneLabel: '<(800) 555-GOVT>',
          };
          fixture.componentRef.setInput('agencyInfo', SAMPLE_PHONE_LABEL);
          fixture.detectChanges();
          const a = el.querySelector('address.usa-footer__address a[href^="tel:"]');
          expect(a!.textContent).toBe('<(800) 555-GOVT>');
        });

        it('should render email with correct href', () => {
          fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
          fixture.detectChanges();
          const a = el.querySelector('address.usa-footer__address a[href^="mailto:"]');
          expect(a).toBeTruthy();
          expect(a!.getAttribute('href')).toBe(`mailto:${SAMPLE_AGENCY.email}`);
        });
      });
    });

    describe('Secondary section', () => {
      it('should not render agency name by default', () => {
        const name = el.querySelector('.usa-footer__logo-heading');
        expect(name).toBeNull();
      });

      it('should not render agency logo by default', () => {
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo).toBeNull();
      });

      describe('Agency information', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
          fixture.detectChanges();
        });

        it('should render agency name with the passed text', () => {
          const name = el.querySelector('.usa-footer__logo-heading');
          expect(name).toBeTruthy();
          expect(name!.textContent).toBe(SAMPLE_AGENCY.name);
        });

        it('should render agency logo with correct src', () => {
          const logo = el.querySelector('img.usa-footer__logo-img');
          expect(logo).toBeTruthy();
          expect(logo!.getAttribute('src')).toBe(SAMPLE_AGENCY.logoImagePath);
        });
      });
    });

    describe('Accessibility', () => {
      it('should have an aria-label on nav', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav!.getAttribute('aria-label')).toBe('Footer navigation');
      });

      it('should have an empty alt for the logo by default', () => {
        fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
        fixture.detectChanges();
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo!.getAttribute('alt')).toBe('');
      });

      it('should use alt for the logo when provided', () => {
        const SAMPLE_ALT: FooterAgencyInfo = {
          logoImagePath: '/path',
          logoAlt: 'logo alternative text',
        };
        fixture.componentRef.setInput('agencyInfo', SAMPLE_ALT);
        fixture.detectChanges();
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo!.getAttribute('alt')).toBe('logo alternative text');
      });
    });
  });
});
