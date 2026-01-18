## Library Contribution

### Steps to Contribute

#### Select a Component
Choose a component from the official **USWDS component library** that has **not already been implemented** in `ngx-uswds-lib`.
- Check existing components and open pull requests to avoid duplication.

#### Create a Feature Branch
Create a new branch dedicated **only** to the selected component.
- Use a descriptive branch name (e.g., `feature/accordion`, `component/alert`).

#### Create the Component Directory
In the `src/components` directory, create a new folder for your component.
- The folder name **must match the component name** as listed on the USWDS website.

#### Implement the Component
- Reference the **official USWDS component documentation and source code** throughout development.
- Ensure the Angular component:
  - Matches USWDS structure and behavior
  - Supports **all variants, states, and configurations** listed on the USWDS website
  - Follows existing `ngx-uswds-lib` coding patterns and conventions
- Import and enable required USWDS dependencies, for example:
```ts
import { accordion } from '@uswds/uswds/js'; // import this

@Component({
  selector: 'lib-uswds-accordion',
  imports: [],
  templateUrl: './uswds-accordion.html',
  styleUrl: './uswds-accordion.css',
})
export class UswdsAccordion {
  ngOnInit() {
    accordion.on(); // enable this
  }
}

```

#### Verify and Test
- Confirm visual and functional parity with the USWDS examples
- Add or update tests and documentation as needed

#### Submit a Pull Request
- Open a pull request targeting the main development branch
- Clearly describe:
  - The implemented component
  - Supported variations
  - Any deviations from the USWDS reference (if applicable) 

### Component Testing and Verification
#### Link Library and Demo Application 
- In the terminal enter the `ngx-uswds-lib` directory.
- run the following commands:
    - `npm install`
    - `npm link`
    - `npx ng build ngx-uswds-lib`
        - Optional: you can add the `--watch` in the command to make edits to the library without manually re-building it. Another terminal will be needed for further commands.
- Exit the `ngx-uswds-lib` directory and enter the `ngx-uswds-workspace` directory.
- Run the following command: 
    - `npm link ngx-uswds-lib`

#### Running the Demo Application
- Run the following command within the `ngx-uswds-workspace` directory:
    - `npm run start`

### Resources

1. [USWDS Component Library](https://designsystem.digital.gov/components/overview/)