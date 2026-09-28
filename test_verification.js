const BASE_URL = 'http://localhost:3000';

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 FEEDANTS ASSIGNMENT FULL-STACK COMPREHENSIVE TEST');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Check Frontend HTML Serving
    console.log('--- 1. Testing Frontend Delivery ---');
    const htmlRes = await fetch(`${BASE_URL}/`);
    assert(htmlRes.status === 200, 'Frontend index.html returned status 200');
    const htmlText = await htmlRes.text();
    assert(htmlText.includes('Feedants'), 'index.html contains Feedants title');
    assert(htmlText.includes('assets/index-'), 'index.html links to compiled Vite JS/CSS bundles');

    // Extract JS and CSS asset URLs
    const cssMatch = htmlText.match(/href="([^"]+\.css)"/);
    const jsMatch = htmlText.match(/src="([^"]+\.js)"/);

    if (cssMatch && cssMatch[1]) {
      const cssRes = await fetch(`${BASE_URL}${cssMatch[1]}`);
      assert(cssRes.status === 200, `CSS bundle loaded successfully (${cssMatch[1]})`);
    }
    if (jsMatch && jsMatch[1]) {
      const jsRes = await fetch(`${BASE_URL}${jsMatch[1]}`);
      assert(jsRes.status === 200, `JS bundle loaded successfully (${jsMatch[1]})`);
    }

    // 2. Testing API: GET /api/competitions/current
    console.log('\n--- 2. Testing Competition Details API ---');
    const compRes = await fetch(`${BASE_URL}/api/competitions/current`);
    assert(compRes.status === 200, 'GET /api/competitions/current returned 200');
    const compData = await compRes.json();
    assert(compData.success === true, 'Response JSON success is true');
    const comp = compData.data;

    assert(comp.title === 'Feedants Classical Dance', `Title matches PDF: "${comp.title}"`);
    assert(comp.prizePool === 1500, `Prize Pool matches PDF: ₹${comp.prizePool}`);
    assert(comp.entryFee === 99, `Entry Fee matches PDF: ₹${comp.entryFee}`);
    assert(comp.totalSpots === 20, `Total Spots: ${comp.totalSpots}`);
    assert(comp.judge.name === 'Manju Dubey', `Judge matches PDF: ${comp.judge.name}`);
    assert(comp.rewards.length === 6, `Rewards defined for all 6 positions (Count: ${comp.rewards.length})`);
    assert(comp.rewards[0].amount === 550, `1st Winner reward: ₹${comp.rewards[0].amount}`);
    assert(comp.rewards[1].amount === 300, `2nd Winner reward: ₹${comp.rewards[1].amount}`);
    assert(comp.rewards[2].amount === 240, `3rd Winner reward: ₹${comp.rewards[2].amount}`);
    assert(comp.previousWinners.length >= 4, `Previous winners count: ${comp.previousWinners.length}`);
    assert(comp.previousWinners[0].name === 'Riya Shah', `Previous winner 1: ${comp.previousWinners[0].name}`);

    const compId = comp._id;

    // 3. Testing Registration Status for User 1 vs User 2
    console.log('\n--- 3. Testing User Registration States ---');
    const u1Res = await fetch(`${BASE_URL}/api/competitions/${compId}/registration-status?userId=user_1`);
    const u1Data = await u1Res.json();
    assert(u1Data.data.isRegistered === true, 'User 1 initial state is REGISTERED (shows "Upload Submission")');

    const u2Res = await fetch(`${BASE_URL}/api/competitions/${compId}/registration-status?userId=user_unregistered_test`);
    const u2Data = await u2Res.json();
    assert(u2Data.data.isRegistered === false, 'New user is UNREGISTERED (shows "Register Now • ₹99")');

    // 4. Testing User Registration & Spot Decrement
    console.log('\n--- 4. Testing Dynamic Registration & Atomic Spot Decrement ---');
    const initialSpots = comp.remainingSpots;
    const regRes = await fetch(`${BASE_URL}/api/competitions/${compId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test_participant_99',
        userName: 'Priya Sharma',
        userEmail: 'priya@test.com'
      })
    });
    assert(regRes.status === 200, 'POST /api/competitions/:id/register returned 200');
    const regData = await regRes.json();
    assert(regData.success === true, 'Registration succeeded');
    assert(regData.registration.transactionId.startsWith('TXN_'), `Transaction ID generated: ${regData.registration.transactionId}`);

    // Verify spot decrement
    const compCheck = await (await fetch(`${BASE_URL}/api/competitions/current`)).json();
    assert(compCheck.data.remainingSpots === initialSpots - 1, `Remaining spots accurately decremented: ${initialSpots} -> ${compCheck.data.remainingSpots}`);

    // Check that user is now registered
    const statusCheck = await (await fetch(`${BASE_URL}/api/competitions/${compId}/registration-status?userId=test_participant_99`)).json();
    assert(statusCheck.data.isRegistered === true, 'User state changed to Registered dynamically');

    // 5. Testing Submission Upload
    console.log('\n--- 5. Testing Submission Entry API ---');
    const subRes = await fetch(`${BASE_URL}/api/competitions/${compId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'test_participant_99',
        title: 'Kathak Tarana in Teentaal',
        danceStyle: 'Kathak',
        videoUrl: 'https://youtube.com/watch?v=sampleKathakEntry',
        notes: 'Choreographed under Guru Shishya Parampara'
      })
    });
    assert(subRes.status === 200, 'POST /api/competitions/:id/submit returned 200');
    const subData = await subRes.json();
    assert(subData.success === true, 'Submission recorded successfully');
    assert(subData.data.danceStyle === 'Kathak', `Submission dance style recorded: ${subData.data.danceStyle}`);

    // Fetch submission
    const getSubRes = await (await fetch(`${BASE_URL}/api/competitions/${compId}/submission?userId=test_participant_99`)).json();
    assert(getSubRes.data.title === 'Kathak Tarana in Teentaal', `Retrieved submission title: "${getSubRes.data.title}"`);

    // 6. Testing Concurrency Handling (Simultaneous Registrations)
    console.log('\n--- 6. Testing Concurrency & Race Condition Safety ---');
    const spotsBeforeBatch = compCheck.data.remainingSpots;
    const batchUsers = [1, 2, 3, 4, 5].map(i => ({
      userId: `concurrent_user_${Date.now()}_${i}`,
      userName: `Concurrent Dancer ${i}`,
      userEmail: `concurrent${i}@test.com`
    }));

    const batchPromises = batchUsers.map(u =>
      fetch(`${BASE_URL}/api/competitions/${compId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(u)
      }).then(r => r.json())
    );

    const batchResults = await Promise.all(batchPromises);
    const successfulRegistrations = batchResults.filter(r => r.success).length;
    assert(successfulRegistrations === 5, `All 5 concurrent requests handled safely (5/5 success)`);

    const compAfterBatch = await (await fetch(`${BASE_URL}/api/competitions/current`)).json();
    assert(compAfterBatch.data.remainingSpots === spotsBeforeBatch - 5, `Remaining spots decremented exactly by 5: ${spotsBeforeBatch} -> ${compAfterBatch.data.remainingSpots}`);

    // 7. Testing Reset Spots Utility
    console.log('\n--- 7. Testing State Reset Feature ---');
    const resetRes = await fetch(`${BASE_URL}/api/competitions/reset-spots`, { method: 'POST' });
    assert(resetRes.status === 200, 'POST /api/competitions/reset-spots returned 200');
    const compReset = await (await fetch(`${BASE_URL}/api/competitions/current`)).json();
    assert(compReset.data.bookedSpots === 1 && compReset.data.remainingSpots === 19, 'State reset cleanly: 1/20 Booked, 19 spots remaining (matching PDF state)');

    console.log('\n====================================================');
    console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');

    if (failed === 0) {
      console.log('🎉 ALL SYSTEMS ARE WORKING 100% PERFECTLY!');
    }
  } catch (err) {
    console.error('Fatal test error:', err);
  }
}

runVerification();
