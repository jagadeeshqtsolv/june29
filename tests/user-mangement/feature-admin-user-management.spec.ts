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


test('Admin page loads with tabs in correct order, User Management active by default, and header elements visible', { tag: ["@functional","@regression","@P0","@load-admin-tabs-default-and-header"] }, async ({ page, loginPage, userManagementPage }) => {
  await test.step('Open — Navigate to Admin URL', async () => {
    await page.goto('https://qa-atlas.qtsolvdev.com/admin');
  });

  await test.step('Click — Salesforce login button', async () => {
    await loginPage.clickLoginWithSalesforce();
  });

  await test.step('Assert visible — Admin tabs bar', async () => {
    await userManagementPage.expectAdminTabUsersVisible();
  });

  await test.step("Assert text — Tab 1 label is 'User Management'", async () => {
    await userManagementPage.expectAdminTabUsersText('User Management');
  });

  await test.step("Assert text — Tab 2 label is 'Roles & Access'", async () => {
    await userManagementPage.expectAdminTabRbacText('Roles & Access');
  });

  await test.step("Assert text — Tab 3 label is 'Audit Log'", async () => {
    await userManagementPage.expectAdminTabAuditText('Audit Log');
  });

  await test.step('Assert visible — User Management view (table container)', async () => {
    await userManagementPage.expectUsersVisible();
  });

  await test.step('Assert visible — N Users count label', async () => {
    await userManagementPage.expectUsersVisible();
  });

  await test.step('Assert visible — Search user input', async () => {
    await userManagementPage.expectUsersSearchVisible();
  });

  await test.step('Assert text — Invite user button text', async () => {
    await userManagementPage.expectInviteUserText('Invite user');
  });
});

  test('User table renders exactly five columns in the correct order', { tag: ["@functional","@regression","@P0","@user-table-columns-order"] }, async ({ page, loginPage, userManagementPage }) => {
    await test.step('Open — Navigate to Admin URL', async () => {
      await page.goto(env.baseURL);
    });

    await test.step('Click — Salesforce login button', async () => {
      await loginPage.clickLoginWithSalesforce();
    });

    await test.step('Assert visible — User table', async () => {
      await userManagementPage.expectUsersTableVisible();
    });

    await test.step('Assert count — Header columns count', async () => {
      await userManagementPage.expectHeaderColsCount(5);
    });

    await test.step('Assert text — Column 1: User information', async () => {
      await userManagementPage.expectHeaderCol1Text('User information');
    });

    await test.step('Assert text — Column 2: Role', async () => {
      await userManagementPage.expectHeaderCol2Text('Role');
    });

    await test.step('Assert text — Column 3: Status', async () => {
      await userManagementPage.expectHeaderCol3Text('Status');
    });

    await test.step('Assert text — Column 4: Last active', async () => {
      await userManagementPage.expectHeaderCol4Text('Last active');
    });

    await test.step('Assert text — Column 5: Account Access', async () => {
      await userManagementPage.expectHeaderCol5Text('Account Access');
    });
  });
