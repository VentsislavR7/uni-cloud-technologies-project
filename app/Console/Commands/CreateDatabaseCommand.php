<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'createDatabase';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Created a new database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $databasePath = base_path()."\\database\\database.sqlite";
       if(file_exists($databasePath))
        {
           unlink($databasePath);
        }
        $file = fopen($databasePath ,"w"); 
        fclose($file);
        return 0;
    }
}
