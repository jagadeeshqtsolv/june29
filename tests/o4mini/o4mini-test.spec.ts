import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';

test.describe('Admin User Management - Smoke', () => {
  test('Default User Management view', { tag: ["@smoke","@regression","@P0","@view-user-management"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Assert visible — User Management tab', async () => {
      await userManagementPage.expectAdminTabUsersVisible();
    });
    await test.step('Assert checked — User Management tab is active', async () => {
      await userManagementPage.expectAdminTabUsersChecked();
    });
    await test.step('Assert text — First tab label', async () => {
      await userManagementPage.expectAdminTabUsersText('User Management');
    });
    await test.step('Assert text — Second tab label', async () => {
      await userManagementPage.expectAdminTabRbacText('Roles & Access');
    });
    await test.step('Assert text — Third tab label', async () => {
      await userManagementPage.expectAdminTabAuditText('Audit Log');
    });
    await test.step('Assert visible — Users count label', async () => {
      await userManagementPage.expectUsersVisible();
    });
    await test.step('Assert visible — Search user input', async () => {
      await userManagementPage.expectUsersSearchVisible();
    });
    await test.step('Assert visible — Invite user button', async () => {
      await userManagementPage.expectInviteUserVisible();
    });
    await test.step('Assert text — User information column header', async () => {
      await userManagementPage.expectUsersText('User information');
    });
    await test.step('Assert text — Role column header', async () => {
      await userManagementPage.expectRoleText('Role');
    });
    await test.step('Assert text — Status column header', async () => {
      await userManagementPage.expectStatusText('Status');
    });
    await test.step('Assert text — Last active column header', async () => {
      await userManagementPage.expectLastActiveText('Last active');
    });
    await test.step('Assert text — Account Access column header', async () => {
      await userManagementPage.expectAccountAccessText('Account Access');
    });
  });

  test('Switch between User Management and Roles & Access tabs', { tag: ["@smoke","@regression","@P0","@switch-tabs"] }, async ({ page, loginPage, userManagementPage, rolesAndAccessPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Click — Roles & Access tab', async () => {
      await userManagementPage.clickAdminTabRbac();
    });
    await test.step('Assert visible — Roles & Access view', async () => {
      await rolesAndAccessPage.expectRolesDefinedInVisible();
    });
    await test.step('Click — User Management tab', async () => {
      await userManagementPage.clickAdminTabUsers();
    });
    await test.step('Assert visible — User table', async () => {
      await userManagementPage.expectOrganizationUsersTableVisible();
    });
  });

  test('Search filters table to show matching users', { tag: ["@smoke","@regression","@P0","@search-filters-results"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Fill — Search user input', async () => {
      await userManagementPage.fillUsersSearch(testData.searchFiltersTableToShowMatchingUsers.searchUserInput);
    });
    await test.step('Assert contains — Filtered user row', async () => {
      await userManagementPage.expectOrganizationUsersTableContainsText(testData.searchFiltersTableToShowMatchingUsers.searchUserInput);
    });
  });

  test('Search shows no users found message for no matches', { tag: ["@smoke","@regression","@P0","@search-no-results"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Fill — Search user input', async () => {
      await userManagementPage.fillUsersSearch(testData.searchShowsNoUsersFoundMessageForNoMatches.searchUserInput);
    });
    await test.step('Assert visible — No users found message', async () => {
      await userManagementPage.expectOrganizationUsersTableRowCount(0);
    });
  });

  test('Revoke access for an active user with confirmation', { tag: ["@smoke","@regression","@P0","@revoke-access"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Click — Active user access toggle', async () => {
      await userManagementPage.clickUserAccessToggle();
    });
    await test.step('Assert visible — Revoke access dialog', async () => {
      await userManagementPage.expectRevokeAccessDialogVisible();
    });
    await test.step('Assert contains — Dialog message', async () => {
      await userManagementPage.expectRevokeAccessDialogContainsText('This will prevent');
    });
    await test.step('Click — Revoke button', async () => {
      await userManagementPage.clickRevokeButton();
    });
    await test.step('Assert unchecked — Access toggle is off', async () => {
      await userManagementPage.expectUserAccessToggleUnchecked();
    });
    await test.step('Assert contains — Status badge updated', async () => {
      await userManagementPage.expectFirstRowStatusContainsText('Inactive');
    });
  });

  test('Cancel revocation leaves access toggle unchanged', { tag: ["@smoke","@regression","@P0","@cancel-revoke-access"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Click — Active user access toggle', async () => {
      await userManagementPage.clickUserAccessToggle();
    });
    await test.step('Click — Cancel button', async () => {
      await userManagementPage.clickCancelButton();
    });
    await test.step('Assert checked — Access toggle remains on', async () => {
      await userManagementPage.expectUserAccessToggleChecked();
    });
  });

  test('Re-enable access for an inactive user without confirmation', { tag: ["@smoke","@regression","@P0","@reenable-access"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Click — Inactive user access toggle', async () => {
      await userManagementPage.clickUserAccessToggle(2);
    });
    await test.step('Assert checked — Access toggle is on', async () => {
      await userManagementPage.expectUserAccessToggleChecked(2);
    });
  });

  test('Administrator cannot revoke own access and sees tooltip', { tag: ["@smoke","@regression","@P0","@own-row-toggle-disabled"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Assert disabled — Own access toggle is disabled', async () => {
      await userManagementPage.expectUserAccessToggleDisabled('self');
    });
    await test.step('Hover — Own access toggle', async () => {
      await userManagementPage.hoverUserAccessToggle('self');
    });
    await test.step('Assert visible — Own access tooltip', async () => {
      await userManagementPage.expectTooltipVisible("You cannot revoke your own access.");
    });
  });

  test('Pagination controls navigate between pages', { tag: ["@smoke","@regression","@P0","@pagination"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Admin page', async () => {
      await page.goto('https://qa-atlas.qtsolvdev.com/admin');
    });
    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });
    await test.step('Assert visible — Next page button', async () => {
      await userManagementPage.expectUsersPaginationNextVisible();
    });
    await test.step('Click — Next page button', async () => {
      await userManagementPage.clickUsersPaginationNext();
    });
    await test.step('Assert enabled — Previous page button', async () => {
      await userManagementPage.expectUsersPaginationPreviousEnabled();
    });
  });
});
