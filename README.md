# q-auth
Easy authentication integration for beginner dev projects

How to contribute to the repository.
<code> 
    How to setup repository as developer to the repository or as a developer using the npm package?

    run :- npx commencer
    you will find .env find in your repository directory, there will be COMMENCER_DATABASE_URL, set it according to your mysql database url
    run :- npx prisma generate
    run :- npx prisma migrate deploy
</code>
<code>

    #To stage changes (simply adding changes), run:
    git add &ltfile-path/file-name&gt (recommended)
    #To commit the staged changes, run:
    git commit #opens vim editor

    to edit vim, simply press i, it changes mode to insert 
    edit the template
    press Esc, followed by ':wq' and voila! success
    abandoning commit from vim, press Esc, followed by  '!q'

    after commit, just making git push to your forked repo
    create a pull request


    #or
    git commit -m "&ltmessage&gt" (not recommended)

</code>

<ol style="white-space:normal">

</ol>

User Registration
<ul>
    <li> Registered user will get an otp on mail and need to verify it.
    <li> Registered user (may or may not have verified otp) can't register again.
</ul>