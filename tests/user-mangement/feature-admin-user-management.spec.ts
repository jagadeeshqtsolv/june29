import { test, expect } from '@support/fixtures';
import env from '@support/env';
import testData from '@testdata/test-data.json';

test('Login via Salesforce and land on /admin', { tag: ["@smoke","@regression","@P0","@login-salesforce"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin page', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Click — Click Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });
  await test.step('Assert visible — User Management tab is visible and active', async () => {
    await userManagementPage.expectAdminTabUsersVisible();
    await userManagementPage.expectAdminTabUsersEnabled();
  });
});


test('User Management tab is active by default with correct tabs and columns', { tag: ["@smoke","@regression","@P0","@default-tab-user-management"] }, async ({ page, userManagementPage }) => {
  await test.step('Open — Navigate to Admin page', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Assert visible — User Management tab is active', async () => {
    await userManagementPage.expectAdminTabUsersVisible();
    await userManagementPage.expectAdminTabUsersEnabled();
  });
  await test.step('Assert visible — Roles & Access tab is visible', async () => {
    await userManagementPage.expectAdminTabRbacVisible();
  });
  await test.step('Assert visible — Audit Log tab is visible', async () => {
    await userManagementPage.expectAdminTabAuditVisible();
  });
  await test.step('Assert visible — User table header with 5 columns in correct order', async () => {
    const columns = await userManagementPage.getOrganizationUsersTableColumn();
    expect(columns).toEqual([
      'User information',
      'Role',
      'Status',
      'Last active',
      'Account Access'
    ]);
  });
});


test('User Management header shows N Users, Search user input, and Invite user button', { tag: ["@smoke","@regression","@P0","@user-management-header-elements"] }, async ({ page, userManagementPage }) => {
  await test.step('Open — Navigate to Admin page', async () => {
    await page.goto(env.baseURL);
  });
  await test.step('Assert visible — N Users count label is visible', async () => {
    await userManagementPage.expectUsersVisible();
  });
  await test.step('Assert visible — Search user input is visible with correct placeholder', async () => {
    await userManagementPage.expectUsersSearchVisible();
  });
  await test.step('Assert visible — Invite user button is visible with teal background and white text', async () => {
    await userManagementPage.expectInviteUserVisible();
  });
});
